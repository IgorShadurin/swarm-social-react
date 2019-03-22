pragma solidity ^0.5.1;

contract owned {
    constructor() public { owner = msg.sender; }
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
    constructor() public{
        // todo move it to function
        UsersInfo[userId] = Info({Username: 'admin', Wallet: msg.sender, SwarmType: 0, SwarmHash: ''});
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
    }

    mapping (uint256 => Info) public UsersInfo;
    mapping (string => uint256) Usernames;
    mapping (address => uint256) public Wallets;
    mapping (string => address) Invites;
    uint256 public userId = 1;

    function setHash(string memory hash) public {
        UsersInfo[Wallets[msg.sender]].SwarmHash = hash;
    }

    function getHashByWallet(address user) public view returns (string memory){
        return UsersInfo[Wallets[user]].SwarmHash;
    }

    function getHashByUsername(string memory username) public view returns (string memory){
        return UsersInfo[Usernames[username]].SwarmHash;
    }

    function getWalletByUsername(string memory username) public view returns (address ){
        return UsersInfo[Usernames[username]].Wallet;
    }

    function register(string memory invite, string memory username) public returns (string memory) {
        address inviteAddress = Invites[invite];
        uint256 idByWallet = Wallets[msg.sender];
        uint256 idByUsername = Usernames[username];

        require(inviteAddress != address(0), 'invite_not_found');
        require(inviteAddress == msg.sender, 'incorrect_invite_for_wallet');
        require(idByWallet == 0, 'wallet_registered');
        require(idByUsername == 0, 'username_registered');

        Invites[invite] = address(0);
        UsersInfo[userId] = Info({Username: username, Wallet: msg.sender, SwarmType: 0, SwarmHash: ''});
        Usernames[username] = userId;
        Wallets[msg.sender] = userId;
        userId++;
    }

    function setUsername(string memory username) public returns (string memory){
        // todo release old user nickname if he set new one
        // todo filter chars that not supported in _toLower
        //username = _toLower(username);
        uint256 currentUserId = Wallets[msg.sender];
        if(currentUserId == 0){
            return 'user_not_found';
        }

        uint256 userIdFromUsername = Usernames[username];
        if(userIdFromUsername > 0 && UsersInfo[userIdFromUsername].Wallet != msg.sender){
            return 'username_already_exists';
        }

        Usernames[UsersInfo[currentUserId].Username] = 0;
        UsersInfo[currentUserId].Username = username;
        Usernames[username] = currentUserId;
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

    function resetWallet(address payable newWallet) public payable {
        uint256 currentUserId = Wallets[msg.sender];
        Wallets[msg.sender] = 0;
        Wallets[newWallet] = currentUserId;
        UsersInfo[currentUserId].Wallet = newWallet;
        newWallet.transfer(msg.value);
    }

    function createInvite(string memory invite, address payable wallet) public payable {
        require(Wallets[msg.sender] > 0);
        require(Wallets[wallet] == 0);
        require(Invites[invite] == address(0));
        Invites[invite] = wallet;
        wallet.transfer(msg.value);
    }

    /*function _toLower(string memory str) internal pure returns (string memory) {
		bytes memory bStr = bytes(str);
		bytes memory bLower = new bytes(bStr.length);
		for (uint i = 0; i < bStr.length; i++) {
			// Uppercase character...
			if ((bStr[i] >= 65) && (bStr[i] <= 90)) {
				// So we add 32 to make it lowercase
				bLower[i] = bytes1(int(bStr[i]) + 32);
			} else {
				bLower[i] = bStr[i];
			}
		}

		return string(bLower);
	}*/
}
