var Netmask = require('netmask').Netmask
var configGitGit

//Define the congfig
function GitHub (conf) {
  configGit = conf
}

function create (conf) {
  return new GitHub(conf)
}

module.exports.create = create

//Perform the post opperation
GitHub.prototype.post = function (req, res) {

  //Setup enviorment
  var authorizedIps = configGit.security.authorizedIps
  var githubIps = configGit.security.githubIps
  var payload = req.body

  //If no payoad throw an error
  if (!payload) {
    //Although no one should see this
    console.log('No payload')
    res.writeHead(400)
    res.end()
    return
  }

  //Handle ipv4 issues
  var ipv4 = req.ip.replace('::ffff:', '')
  if (!(inAuthorizedSubnet(ipv4) || authorizedIps.indexOf(ipv4) >= 0 || githubIps.indexOf(ipv4) >= 0)) {
    console.log('Unauthorized IP:', req.ip, '(', ipv4, ')')
    res.writeHead(403)
    res.end()
    return
  }

  if (payload.ref === configGit.repository.branch ||
    payload.ref === 'refs/heads/master' ||
    payload.ref === 'refs/heads/develop') {
      console.log("here")
    myExec(configGit.action.exec.github)
  }

  res.writeHead(200)
  res.end()
}

//We have the subnet, let checks to ensure they match our dataset
var inAuthorizedSubnet = function (ip) {
  var authorizedSubnet = configGit.security.githubAuthorizedSubnets.map(function (subnet) {
    return new Netmask(subnet)
  })
  return authorizedSubnet.some(function (subnet) {
    return subnet.contains(ip)
  })
}

//Now execute the .sh file
var myExec = function (line) {
  var exec = require('child_process').exec
  var execCallback = function (error) {
    if (error !== null) {
      console.log('exec error: ' + error)
    }
  }
  exec(line, execCallback)
}
