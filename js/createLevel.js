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

var box_idx, tire_idx, tree_idx, fence_idx;
var selected_obstacle= [ 'Fence'] //'WoodenBox','Tree','Tire',

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
    }
    // 'Rock': (start) => {
    //     if (start){

    //     }
    // }
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

export {createLevel,box_idx,tire_idx,tree_idx,fence_idx, selected_obstacle, create_obstacle}