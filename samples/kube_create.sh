ᐅ kubectl create -f renderer/src/renderer/controller.yaml
replicationcontrollers/renderer
ᐅ kubectl create -f renderer/src/renderer/service.yaml
services/renderer
ᐅ kubectl create -f dispatcher/controller.yaml
replicationcontrollers/dispatcher
ᐅ kubectl create -f dispatcher/service.yaml
services/dispatcher
ᐅ kubectl create -f frontend/controller.yaml
replicationcontrollers/frontend
ᐅ kubectl create -f frontend/service.yaml