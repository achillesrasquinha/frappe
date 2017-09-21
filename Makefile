PATH_NODE = $(realpath node_modules)
ELECTRON  = $(PATH_NODE)/.bin/electron

SAMPLEDIR = $(realpath examples)

install:
	npm  install
	yarn install 

run:
	$(ELECTRON) -r babel-register $(SAMPLEDIR)/hello-world