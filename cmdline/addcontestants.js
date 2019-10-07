const fs = require('fs');
const csv = require('csv-parse/lib/sync');
const callAppSync = require('./callappsync').callAppSync;

const ADMIN_JOIN_GAME = `
  mutation AdminJoinGame(
    $gameId: Int!
    $login: String!
    $name: String!
    $organization: String!
  ) {
    adminJoinGame(
      gameId: $gameId
      login: $login
      name: $name
      organization: $organization
  ) {
      gameId
      login
      name
      organization
      score
    }
  }
`;



exports.addContestants = (datafile, qty, gameId) => {
    const file = fs.readFileSync(datafile);
    const records = csv(file, { columns: true });
    for(var count = 0; count < qty; count++) {
        const i = Math.floor(Math.random() * records.length);
        const person = records.splice(i, 1)[0]; // remove 1 element at index i
        const args = {
            gameId: gameId,
            login: person.login,
            name: person.name,
            organization: person.organization,
        };
        try {
          callAppSync(ADMIN_JOIN_GAME, args, 'adminJoinGame', () => {});
        } catch(e) {
          console.log('error:', e);//JSON.stringify(e));
          console.log('   person:', JSON.stringify(person));
          console.log('   args:', JSON.stringify(args));
        }
    }
}
