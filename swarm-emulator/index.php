<?php
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/vendor/yiisoft/yii2/Yii.php';

class SwarmEmulator
{
    public $redis = null;
    public $prefix = 'swarm_simulator_';

    public function __construct()
    {
        $this->redis = new \yii\redis\Connection();
    }

    public function saveNewFile($hash, $content)
    {
        $path = './files/' . $hash;
        if (file_exists($path)) {
            return true;
        }

        return file_put_contents($path, $content);
    }

    public function getList($hash, $isDecoded = false)
    {
        $items = $this->redis->lrange($this->prefix . $hash, 0, -1);;
        if ($isDecoded) {
            $result = [];
            foreach ($items as $item) {
                $result[] = json_decode($item, true);
            }

            return $result;
        } else {
            return $items;
        }
    }

    public function addFileToList($fileContent, $filePath, $listHash = null)
    {
        $fileHash = $this->getContentHash($fileContent);
        $this->saveNewFile($fileHash, $fileContent);
        $data = [
            json_encode([
                'path' => $filePath,
                'hash' => $fileHash,
            ])
        ];

        if ($listHash) {
            // todo check file not found with this hash and name
            $oldData = $this->getList($listHash);
            foreach ($oldData as $item) {
                $item = json_decode($item, true);
                if ($item['path'] === $filePath && $item['hash'] === $fileHash) {
                    return $listHash;
                }
            }

            $oldData[] = $data[0];
            $data = $oldData;
        }

        $contentHash = $this->setList($data);

        return $contentHash;
    }

    public function setList($data)
    {
        $dataJson = json_encode($data);
        $contentHash = $this->getContentHash($dataJson);
        $newListHash = $this->prefix . $contentHash;
        if (!$this->redis->exists($newListHash)) {
            $this->redis->rpush($newListHash, ...$data);
        }

        return $contentHash;
    }

    public function getContentHash($content)
    {
        return hash('sha256', $content);
    }

    public function getFile($path, $listHash)
    {
        $result = 'File not found';
        $list = $this->getList($listHash);
        foreach ($list as $item) {
            $item = json_decode($item, true);
            if ($item['path'] === $path) {
                $result = file_get_contents('./files/' . $item['hash']);
            }
        }

        return $result;
    }

    public function deleteFile($path, $listHash)
    {
        $result = false;
        $list = $this->getList($listHash);
        foreach ($list as $k => $item) {
            $item = json_decode($item, true);
            if ($item['path'] === $path) {
                unset($list[$k]);
                $contentHash = $this->setList($list);
                $result = $contentHash;
            }
        }

        return $result;
    }
}

$emulator = new SwarmEmulator();

$requestMethod = $_SERVER['REQUEST_METHOD'];
$pathInfo = $_SERVER['PATH_INFO'];
$explodedInfo = explode('/', $pathInfo);

$currentHashList = null;
$fileName = null;
$isList = mb_strpos($pathInfo, '/bzz-list:/') !== false;
if (count($explodedInfo) >= 3) {
    $currentHashList = $explodedInfo[2];
}

if ($currentHashList) {
    $needle = '/bzz:/';
    if ($isList) {
        $needle = '/bzz-list:/';
    }

    $fileName = str_replace($needle . $currentHashList, '', $pathInfo);
}

if (!$fileName) {
    $fileName = '/';
}

//var_dump($currentHashList);
//var_dump($fileName);

if ($requestMethod === 'GET') {
    if (!$fileName || !$currentHashList) {
        die('Empty filename or hash');
    }

    $result = '';
    if ($isList) {
        $result = $emulator->getList($currentHashList, true);
        $result = json_encode($result, JSON_PRETTY_PRINT);
    } else {
        $result = $emulator->getFile($fileName, $currentHashList);
    }

    die($result);
} else if ($requestMethod === 'POST') {
    $body = file_get_contents('php://input');
    if (empty($body)) {
        die('Files not found');
    }

    $newHashList = $emulator->addFileToList($body, $fileName, $currentHashList);
    die($newHashList);
} else if ($requestMethod === 'DELETE') {
    $newHashList = $emulator->deleteFile($fileName, $currentHashList);
    die($newHashList);
}