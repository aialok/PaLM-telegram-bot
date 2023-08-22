const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.botToken);



bot.on('text', async (ctx) => {
    const firstName = ctx.from.first_name;
    const username = ctx.from.username;
    console.log("Client Name: " + firstName);
    console.log("Client Username: " +username);

    const text = await ctx.message.text;
    ctx.reply("Getting your response in a while......");


        const { DiscussServiceClient } = require("@google-ai/generativelanguage");
        const { GoogleAuth } = require("google-auth-library");

        const MODEL_NAME = "models/chat-bison-001";
        const API_KEY = process.env.API_KEY;

        const client = new DiscussServiceClient({
            authClient: new GoogleAuth().fromAPIKey(API_KEY),
        });
        
        async function main(text) {
            const result = await client.generateMessage({
                model: MODEL_NAME, // Required. The model to use to generate the result.
                temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
                candidateCount: 1, // Optional. The number of candidate results to generate.
                prompt: {
                    // optional, preamble context to prime responses
                    context: "Respond to all the question in good manner.",
                    // Required. Alternating prompt/response messages.
                    messages: [{ content: text }],
                },
            });

            
            const response=(result[0].candidates[0].content);
            
        
            console.log("User Response: "+ text);
            console.log("PaLM response: " +response);
            await ctx.reply(response);

    
           
            


        }

      main(text);
    // Respond to the user
   

    return text;

});



//For running bot using localhost

 bot.launch();

 //For running your code in aws lamda

// exports.handler =(event, context, callback)=>{
//     const temp=JSON.parse(event.body);
//     bot.handleUpdate(temp);
//     return callback(null,{
//         statusCode : 200,
//         body: '',
//     });
// };


  