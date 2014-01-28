# AC Challenge - BackboneJS [![Build Status](https://api.travis-ci.org/rafaelrocha/ac_challenge_backbonejs.png)](https://travis-ci.org/rafaelrocha/ac_challenge_backbonejs/builds)


Setting development environment up
==================================

## Download and Install

1. [Vagrant](https://www.vagrantup.com/downloads.html)

2. [Virtual Box](https://www.virtualbox.org/wiki/Downloads)

## Follow the following steps

1. Clone the repository.
```shell
git clone git://github.com/rafaelrocha/ac_challenge_backbonejs.git
```

2. On ac_challenge_backbonejs project root folder run Vagrant to instantiate your dev box.
```shell
	$vagrant up
```

3. Connect to the box. The following steps is considering you are conneceted to your dev box.
```shell
	$vagrant ssh
```

4. Go to the share folder which is /vagrant.
```shell
	vagrant@precise32:/vagrant$ cd /vagrant
```

5. Run grunt.
```shell
	vagrant@precise32:/vagrant$ grunt
```

6. Access the application on a browser on your local machine http://localhost:4000