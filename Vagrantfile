VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # the vagrant box name
  config.vm.box = "precise32"
  # the url of the VM source
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"  
  # forward our machine 4000 port to the VM 4000 port for express access
  config.vm.network :forwarded_port, guest: 4000, host: 4000
  # optionally, use 512MB ram instead of 384MB because of Bundler
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", 512]
  end

  config.vm.provision :shell, :path => "cookbooks/fix-ubuntu-repo-issue.sh"

  config.vm.provision "chef_solo" do |chef|

    #workaround over mongodb cookbook which was not finding the default value for logpath
    chef.json = {
      "mongodb" => {
        "logpath" => "/var/log/mongodb"
      }
    }
    chef.add_recipe "apt"
    chef.add_recipe "nodejs"
    chef.add_recipe "mongodb"
  end

  config.vm.provision "shell",
    inline: "
      npm install -g grunt-cli
      cd /
      sudo mkdir -p data/db
      nohup mongod &
    "
end