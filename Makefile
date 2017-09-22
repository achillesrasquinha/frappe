PATH_NODE  = $(realpath node_modules)
ELECTRON   = $(PATH_NODE)/.bin/electron
NODE       = $(PATH_NODE)/.bin/babel-node

SAMPLEDIR  = $(realpath examples)
SAMPLEDESK = erpnext.desk

install:
	npm  install
	yarn install

desk-new:
	rm -rf $(SAMPLEDIR)/$(SAMPLEDESK)

	$(NODE) desk new $(SAMPLEDIR)/$(SAMPLEDESK)

run:
	$(ELECTRON) -r babel-register $(SAMPLEDIR)/hello-world