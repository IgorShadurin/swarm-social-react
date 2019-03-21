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

    }

    struct Info
    {
    string SwarmHash;
    string Username;
    }

    mapping (address => Info) public UsersInfo;
    mapping (string => address) Usernames;

    function setHash(string memory hash) public {
        UsersInfo[msg.sender].SwarmHash = hash;
    }

    function getHash(address User) public view returns (string memory){
        return UsersInfo[User].SwarmHash;
    }

    function setUsername(string memory username) public returns (string memory){
        // todo release old user nickname if he set new one
        // todo filter chars that not supported in _toLower
        //username = _toLower(username);
        address usernameOwner = Usernames[username];
        if(usernameOwner != address(0) && usernameOwner != msg.sender){
           return 'already registered';
        } else if(usernameOwner != address(0) && usernameOwner == msg.sender){
            return 'ok';
        } else{
            Usernames[username]=msg.sender;
            UsersInfo[msg.sender].Username = username;
            return 'ok';
        }
    }

    function getUsername(address wallet) public view returns (string memory){
       return UsersInfo[wallet].Username;
    }

    function getMyUsername() public view returns (string memory){
       return UsersInfo[msg.sender].Username;
    }

    function getAddressByUsername(string memory username) public view returns (address){
        //username = _toLower(username);

        return Usernames[username];
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
