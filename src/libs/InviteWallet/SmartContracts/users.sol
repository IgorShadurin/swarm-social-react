pragma solidity ^0.5.1;
pragma experimental ABIEncoderV2;

contract owned {
    constructor() public {owner = msg.sender;}
    address payable owner;

    // This contract only defines a modifier but does not use
    // it: it will be used in derived contracts.
    // The function body is inserted where the special symbol
    // `_;` in the definition of a modifier appears.
    // This means that if the owner calls this function, the
    // function is executed and otherwise, an exception is
    // thrown.
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }
}

contract mortal is owned {
    // This contract inherits the `onlyOwner` modifier from
    // `owned` and applies it to the `close` function, which
    // causes that calls to `close` only have an effect if
    // they are made by the stored owner.
    function close() public onlyOwner {
        selfdestruct(owner);
    }
}

contract Users {
    constructor() public {
        // todo move it to function
        UsersInfo[userId] = Info({Username : 'admin', Wallet : msg.sender, SwarmType : 0, SwarmHash : '', WalletFileHash : ''});
        Usernames['admin'] = userId;
        Wallets[msg.sender] = userId;
        userId++;
        addMessage(1, "Hello moto");
    }

    struct Info
    {
        string SwarmHash;
        uint32 SwarmType; // swarm - 0, emulator - 1
        string Username;
        address Wallet;
        string WalletFileHash;
    }

    struct Message{
        string message;
        uint256 fromUserId;
        uint256 toUserId;
    }

    mapping(uint256 => Info) public UsersInfo;
    mapping(uint256 => uint256[]) public Notifications;
    mapping(address => uint256) public Wallets;
    mapping(string => uint256) Usernames;
    mapping(string => address) Invites;
    mapping(uint256 => Message) public Messages;
    uint256 public userId = 1;
    uint256 public messageId = 1;
    mapping(string => uint256[]) Dialogs;

    function append(string memory a, string memory b, string memory c) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }

    function uintToString(uint v) public view returns (string memory str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        str = string(s);
    }

    function getMessages(string memory fromUserId, string memory toUserId) public view returns(uint256[] memory){
        return Dialogs[append(fromUserId, "_", toUserId)];
    }

    function addMessage(uint256 toUserId, string memory message) public {
        // todo check toUserId
        uint256 fromUserId = Wallets[msg.sender];
        require(fromUserId > 0, 'from_user_not_found');

        if(fromUserId < toUserId){
            Dialogs[append(uintToString(fromUserId), "_", uintToString(toUserId))].push(messageId);
        }else{
            Dialogs[append(uintToString(toUserId), "_", uintToString(fromUserId))].push(messageId);
        }

        Messages[messageId] = Message({message: message, fromUserId: fromUserId, toUserId: toUserId});
        messageId++;
    }

    function addNotification(address toAddress) public returns(uint256){
        // todo init event
        uint256 fromId = Wallets[msg.sender];
        uint256 toId = Wallets[toAddress];
        Notifications[fromId].push(toId);

        return getNotificationsCount(msg.sender);
    }

    function getNotification(address fromAddress, uint256 index) public view returns(uint256){
        return Notifications[Wallets[fromAddress]][index];
    }

    function getNotificationsCount(address fromAddress) public view returns(uint256){
        return Notifications[Wallets[fromAddress]].length;
    }

    function getHashByWallet(address user) public view returns (string memory){
        return UsersInfo[Wallets[user]].SwarmHash;
    }

    function getHashByUsername(string memory username) public view returns (string memory){
        return UsersInfo[Usernames[username]].SwarmHash;
    }

    function getWalletByUsername(string memory username) public view returns (address){
        return UsersInfo[Usernames[username]].Wallet;
    }

    function getUsername(address wallet) public view returns (string memory){
        return UsersInfo[Wallets[wallet]].Username;
    }

    function getMyUsername() public view returns (string memory){
        return UsersInfo[Wallets[msg.sender]].Username;
    }

    function getAddressByUsername(string memory username) public view returns (address){
        //username = _toLower(username);

        return UsersInfo[Usernames[username]].Wallet;
    }

    function setHash(string memory hash) public {
        UsersInfo[Wallets[msg.sender]].SwarmHash = hash;
    }

    function setWalletFileHash(string memory hash) public {
        UsersInfo[Wallets[msg.sender]].WalletFileHash = hash;
    }

    function register(string memory invite, string memory username) public returns (string memory) {
        address inviteAddress = Invites[invite];
        uint256 idByUsername = Usernames[username];

        require(inviteAddress != address(0), 'invite_not_found');
        require(inviteAddress == msg.sender, 'incorrect_invite_for_wallet');
        require(idByUsername == 0, 'username_registered');

        Invites[invite] = address(0);
        uint256 id = Wallets[msg.sender];
        UsersInfo[id].Username = username;
        Usernames[username] = id;
        Wallets[msg.sender] = id;

        return 'ok';
    }

    function setUsername(string memory username) public returns (string memory){
        // todo release old user nickname if he set new one
        // todo filter chars that not supported in _toLower
        //username = _toLower(username);
        uint256 currentUserId = Wallets[msg.sender];
        uint256 userIdFromUsername = Usernames[username];

        require(currentUserId > 0, 'user_not_found');
        require(userIdFromUsername == 0, 'username_already_exists');

        /*if(userIdFromUsername > 0 && UsersInfo[userIdFromUsername].Wallet != msg.sender){
            return 'username_already_exists';
        }*/

        Usernames[UsersInfo[currentUserId].Username] = 0;
        UsersInfo[currentUserId].Username = username;
        Usernames[username] = currentUserId;

        return username;
    }

    function resetWallet(address payable newWallet) public payable {
        uint256 currentUserId = Wallets[msg.sender];

        require(currentUserId > 0);
        require(Wallets[newWallet] == 0);

        Wallets[msg.sender] = 0;
        Wallets[newWallet] = currentUserId;
        UsersInfo[currentUserId].Wallet = newWallet;
        newWallet.transfer(msg.value);
    }

    function createInvite(string memory invite, address payable wallet, string memory walletFileHash) public payable {
        require(Wallets[msg.sender] > 0);
        require(Wallets[wallet] == 0);
        require(Invites[invite] == address(0));

        Invites[invite] = wallet;
        wallet.transfer(msg.value);
        UsersInfo[userId].Wallet = wallet;
        UsersInfo[userId].WalletFileHash = walletFileHash;
        Wallets[wallet] = userId;
        userId++;
    }

    /*function getWalletHashByWallet(address wallet) public returns (string memory){
        uint256 currentUserId = Wallets[wallet];

        return UsersInfo[currentUserId].WalletFileHash;
    }*/

    function saveUser(string memory username, string memory walletFileHash) public returns (string memory){
        setUsername(username);
        setWalletFileHash(walletFileHash);

        return 'ok';
    }

    // todo get userid by username
}
