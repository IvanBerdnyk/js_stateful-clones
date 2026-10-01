'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        stateHistory.push({ ...currentState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        stateHistory.push({ ...currentState });
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        stateHistory.push({ ...currentState });
        break;

      default:
        stateHistory.push({ ...currentState });
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
