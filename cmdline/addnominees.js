const callAppSync = require('./callappsync').callAppSync;

const GET_CONTESTANTS_GQL = `
    query listContestants {
        listContestants {
            login
            name
            organization
        }
    }
`;

const MOD_GQL = `
    mutation nominateContestant($quesId: Int!, $login: String!, $name: String!, $organization: String!) {
        nominateContestant(quesId: $quesId, login: $login, name: $name, organization: $organization) {
            quesId
            login
            name
            organization
            timebuzzed
        }
    }
`;

exports.addNominees = (quesId, qty) =>
    callAppSync(GET_CONTESTANTS_GQL, {}, "listContestants", (contestants) => {
        for(var count = 0; count < qty; count++) {
            const i = Math.floor(Math.random() * contestants.length);
            const person = contestants.splice(i, 1)[0]; // remove 1 element at index i
            // console.log("Person:", person);
            const args = {
                quesId: quesId,
                login: person.login,
                name: person.name,
                organization: person.organization
            };
            callAppSync(MOD_GQL, args, 'nominateContestant', () => { });
        }
    });
