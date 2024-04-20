/**
 *
 * LEVELS
 * ------
 * Logic for start and end of levels, including initialization of objects on
 * the map
 */

var selected_obstable = ['WoodenBox']
const create_obstacle = {
    'WoodenBox': () => {
        createBoxes();
    },
    'Tire': () => {
        createTires();
    },
    'Tree': () => {
        createTrees();
    }
};
const tire_idx = selected_obstable.indexOf('Tire');
const box_idx = selected_obstable.indexOf('WoodenBox');
const tree_idx = selected_obstable.indexOf('Tree');


function createLevel() {
    createFuels();
    // createTrees();
    // createBoxes();
    // createTires();
    for( const obs of selected_obstable){
        console.log(obs)
        create_obstacle[obs]();
    }
    startTimer();
}