/**
 *
 * LEVELS
 * ------
 * Logic for start and end of levels, including initialization of objects on
 * the map
 */
import {createFuels} from './createFuels.js'
import { createBoxes,endBoxes } from './createWoodenBox.js';
import { createTires,endTires } from './createTire.js';
import {createTrees, endTrees} from './createTree.js';
import {createCones, endCones} from './createFence.js';
import { startTimer } from './addUpdateLogic.js';
import { createRocks,endRocks } from './createRock.js';

var box_idx, tire_idx, tree_idx, fence_idx, rock_idx;
var selected_obstacle= [] //'WoodenBox','Tree','Tire',
var num_obstacle;

function level_obstacle(level){
    if(level == 'simple'){
        selected_obstacle.push('Tree');
        num_obstacle = 15;
    }
    else if (level == 'medium'){
        selected_obstacle.push('Tree','WoodenBox');
        num_obstacle = 10;
    }
    else{
        selected_obstacle.push('Tree','WoodenBox','Fence','Rock');
        num_obstacle = 15;
    }
}


document.addEventListener('DOMContentLoaded',(event) => {
    let level = localStorage.getItem('level');
    level_obstacle(level);
})

const create_obstacle = {
    'WoodenBox': (start) => {
        if(start){
            box_idx = selected_obstacle.indexOf('WoodenBox');
            createBoxes();
        }
        else{
            endBoxes();
        }
    },
    'Tire': (start) => {
        if(start){
            tire_idx = selected_obstacle.indexOf('Tire');
            createTires();
        }
        else{
            endTires();
        }
    },
    'Tree': (start) => {
        if(start){
            tree_idx = selected_obstacle.indexOf('Tree');
            createTrees();
        }
        else{
            endTrees();
        }
    },
    'Fence': (start) => {
        if(start){
            fence_idx = selected_obstacle.indexOf('Fence');
            createCones();
        }
        else{
            endCones();
        }
    },
    'Rock': (start) => {
        if (start){
            rock_idx = selected_obstacle.indexOf('Rock');
            createRocks(num_obstacle);
        }
        else{
            endRocks();
        }
    }
}


function createLevel() {
    createFuels();
    
    // createTrees();
    // createBoxes();
    // createTires();
    for( const obs of selected_obstacle){
        console.log(obs)
        create_obstacle[obs](true);
    }
    startTimer();
}

export {createLevel,box_idx,tire_idx,tree_idx,fence_idx,rock_idx, selected_obstacle, create_obstacle, level_obstacle, num_obstacle}