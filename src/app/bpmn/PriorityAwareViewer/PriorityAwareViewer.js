'use strict';

var Viewer = require('bpmn-js-task-priorities/node_modules/bpmn-js/lib/Viewer');
function PriorityAwareViewer(options) {
    Viewer.call(this, options);
}

var inherits = require('inherits');
inherits(PriorityAwareViewer, Viewer);

module.exports = PriorityAwareViewer;

var prioritiesModule = require('bpmn-js-task-priorities/lib/priorities');
PriorityAwareViewer.prototype._modules = PriorityAwareViewer.prototype._modules.concat([prioritiesModule]);