'use strict';
var graph;
// based on http://bl.ocks.org/ericcoopey/6c602d7cb14b25c179a4

function myGraph() {

    // Add and remove elements on the graph object
    this.addNode = function(id) {
        nodes.push({
            "id": id
        });
        update();
    };

    this.removeNode = function(id) {
        var i = 0;
        var n = findNode(id);
        while (i < links.length) {
            if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                links.splice(i, 1);
            } else i++;
        }
        nodes.splice(findNodeIndex(id), 1);
        update();
    };
    this.RemoveRandomNode = function() {
        this.removeNode(nodes[Math.random() * nodes.length | 0].id);
    };
    this.RemoveRandomLink = function() {
        links.splice(Math.random() * links.length | 0, 1);
        update();
    };

    this.removeLink = function(source, target) {
        for (var i = 0; i < links.length; i++) {
            if (links[i].source.id == source && links[i].target.id == target) {
                links.splice(i, 1);
                break;
            }
        }
        update();
    };

    this.removeallLinks = function() {
        links.splice(0, links.length);
        update();
    };

    this.removeAllNodes = function() {
        nodes.splice(0, links.length);
        update();
    };

    this.addLink = function(source, target, value) {
        links.push({
            "source": findNode(source),
            "target": findNode(target),
            "value": value
        });
        update();
    };
    this.addRandomLink = function(source) {
        if (nodes.length < 2) return;
        var b;
        do {
            b = nodes[Math.random() * nodes.length | 0];
        } while (source == b.id);
        this.addLink(source, b.id, 20);
    };

    var findNode = function(id) {
        for (var i in nodes) {
            if (nodes[i]["id"] === id) return nodes[i];
        };
        throw "Node note found " + id;
    };

    var findNodeIndex = function(id) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id == id) {
                return i;
            }
        };
    };

    // set up the D3 visualisation in the specified element
    var w = 960,
        h = 450;

    var color = d3.scale.category10();

    var svg = d3.select("body")
        .insert("svg:svg",":first-child")
        //.append("svg:svg",":first-child")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight)
        .attr("id", "svg")
        .attr("pointer-events", "all")
        .attr("viewBox", "0 0 " + w + " " + h)
        .attr("perserveAspectRatio", "xMinYMid")

    var vis = svg.append('svg:g')

    var force = d3.layout.force();
    force.slowMotion = true;
    force.fullSpeed = false;

    var nodes = force.nodes(),
        links = force.links();

    this.nodes = nodes;

    var update = function() {
        var link = vis.selectAll("line")
            .data(links, function(d) {
                return d.source.id + "-" + d.target.id;
            });

        link.enter().append("line")
            .attr("id", function(d) {
                return d.source.id + "-" + d.target.id;
            })
            .attr("stroke-width", function(d) {
                return d.value / 10;
            })
            .attr("class", "link");
        link.exit().remove();

        var node = vis.selectAll("g.node")
            .data(nodes, function(d) {
                return d.id;
            });

        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
        //.call(force.drag);

        nodeEnter.append("svg:circle")
            .attr("r", Math.random() * 20 | 0 + 10)
            .attr("id", function(d) {
                return "Node;" + d.id;
            })
            .attr("class", "nodeStrokeClass")
            .attr("fill", function(d) {
                return color(d.id);
            });

        /*nodeEnter.append("svg:text")
         .attr("class", "textClass")
         .attr("x", 14)
         .attr("y", ".31em")
         .text(function(d) {
         return d.id;
         });*/

        node.exit().remove();

        force.on("tick", function() {

            node.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            link.attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                });
        });

        // Restart the force layout.
        force
            .gravity(.4)
            //.charge(-80000)
            .charge(-20000)
            .linkStrength(0.3)
            .friction(0.04)
            .linkDistance(function(d) {
                return d.value * 5
            })
            .size([w, h])
            .start();
    };

    this.stop = function() {
        force.stop;
    }

    // Make it all go
    update();
}

function drawGraph() {

    graph = new myGraph();
    var c = 0;

    function nextAction() {
        //console.log("action!");
        if (graph.nodes.length > 200 || (c > 10 && Math.random() > 0.7)) {
            if (Math.random() > 0.5)
                graph.RemoveRandomNode();
            else
                graph.RemoveRandomLink();
        } else {
            graph.addNode('N' + c);
            if (c > 0) {
                var t = Math.random() * 3 | 0 + 1;
                while (t-- > 0) {
                    graph.addRandomLink('N' + c);
                    /*graph.addLink('N' + c, 'N' + (Math.random() * c | 0), Math.random() *
                     20 | 0)*/
                }
            }
        }
        c++;
        keepNodesOnTop();
    }
    var int = setInterval(nextAction, 1500)
    for (var i = 0; i < 0; i++) nextAction()
    return function() {
        clearInterval(int);
        var e = document.querySelector("body > svg");
        e.parentNode.removeChild(e);
        graph.stop();
    }

}

var g = drawGraph();

function keepNodesOnTop() {
    var nodes = document.querySelectorAll('.nodeStrokeClass');
    [].forEach.call(nodes, function(node) {
        var gnode = node.parentNode;
        gnode.parentNode.appendChild(gnode);
    });
}

function reDraw() {
    g();
    g = drawGraph();
    reDrawBounced = null;
}
var reDrawBounced;
window.addEventListener('resize', function() {
    if (reDrawBounced) clearTimeout(reDrawBounced);
    reDrawBounced = setTimeout(reDraw,200);
});
