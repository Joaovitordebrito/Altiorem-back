const { insert, fetch, fetchAll, del, update } = require('../adapters/mongoose.adapter')
const dialogflow = require('@google-cloud/dialogflow')
const uuid = require('uuid')
const default_dict = require('../utils/default_dict')

const chatBotController = {
  async dialog (body) {
    if (Object.keys(default_dict).includes(body.question)) {
      let uId = body.uuid ? body.uuid : this.generateUId()
      default_dict[body.question](body.message, uId)
      return {
        statusCode: '200',
        body: {
          status: true
        }
      }
    } else {
      const uId = body.uuid ? body.uuid : this.generateUId()
      const sessionClient = new dialogflow.SessionsClient()
      const sessionPath = sessionClient.projectAgentSessionPath('altiorem-bot-dmrp', uId)
  
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: body.message,
            languageCode: 'pt-BR'
          }
        }
      }
  
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      console.log(result)
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
      return {
        statusCode: '200',
        body: {
          status: 'success',
          response: result.fulfillmentText,
          uid: body.uuid
        }
      }
    }
  },

  generateUId () {
    let uid = uuid.v4()
    insert('user', { uid })
    return uid
  }
}

module.exports = chatBotController