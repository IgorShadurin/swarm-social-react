pragma solidity ^0.5.1;

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
    }

    struct Info
    {
        string SwarmHash;
        uint32 SwarmType; // swarm - 0, emulator - 1
        string Username;
        address Wallet;
        string WalletFileHash;
    }

    mapping(uint256 => Info) public UsersInfo;
    mapping(address => uint256) public Wallets;
    mapping(string => uint256) Usernames;
    // todo is really required?
    mapping(string => address) Invites;
    uint256 public userId = 1;

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
}
