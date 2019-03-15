# SWARM Emulator

To install dependencies:
### `composer install`

- Install redis
- Set writable access to 'files' directory

- Upload one file

curl 'http://127.0.0.1:1111/index.php/bzz:/' -H 'content-type: text/html' --data-binary '@index.html'

- Upload ZIP file with your content

curl 'http://127.0.0.1:1111/index.php/zip' --data-binary '@test.zip'
