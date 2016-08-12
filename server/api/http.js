import * as service from './service/node';

export function getNodes(req, res) {
	service.getNodes(req.params.model)
	.then((nodeArray) => res.json(nodeArray))
	.catch(err => {
		res.status(400);
		res.json({error: err});
	});
}

export function getActiveNode(req, res) {
	service.getActiveNode(req.params.model, req.params.id)
	.then((nodeObj) => res.json(nodeObj))
	.catch(err => {
		res.status(400);
		res.json({error: err});
	});
}

export function updateNode(req, res) {
  service.updateNode(req.params.model, req.params.id, req.body)
  .then((nodeObj) => res.json(nodeObj))
  .catch(err => {
    res.status(400);
    res.json({error: err, nodeObj: req.body});
  });
}

export function addNode(req, res) {
	service.addNode(req.params.model, req.body)
	.then((nodeObj) => res.json(nodeObj))
	.catch(err => {
		res.status(400);
		res.json({error: err, nodeObj: req.body});
	});
}

export function deleteNode(req, res) {
  service.deleteNode(req.params.model, req.params.id)
  .then((nodeObj) => res.json(nodeObj))
  .catch(err => {
    res.status(400);
    res.json({error: err, nodeObj: req.body});
  });
}