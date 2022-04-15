
import DiscordJS from 'discord.js'
let v

const { default: village } = await import('../village.json', {
	assert: {
	  type: 'json'
	}
  });
export default v ={
    category: 'Testing',
    description: 'nhập tên làng',
    slash:"both",
    testOnly: true,
    expectedArgs: '<tên làng>',
    minArgs: 1,
    maxArgs: 1,
    syntaxError: 'Incorrect usage! Please use pokemon command',
    callback: ({ channel,args,interaction  }) => {
    
        // message is provided only for a legacy command
        
            const option = args[0]
            for(let i=0;i<village.rows.length;i++){
                if(option==(`${village.rows[i].name}`)){
                    var item = village.rows[i].code[Math.floor(Math.random()*village.rows[i].code.length)]
                    channel.send({content:item});
                    break;
                }else{
                    
            } 
            }
      },
}