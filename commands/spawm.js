import { SlashCommandBuilder } from'@discordjs/builders';
const { default: spawm } = await import('../spawm.json', {
	assert: {
	  type: 'json'
	}
  });
spawm = {
	data: new SlashCommandBuilder()
		.setName('spawm now')
		.setDescription('đang xử lý'),
	async execute(interaction) {
        for(let i=0;i<village.rows.length;i++){
			
				var item = village.rows[i].code[Math.floor(Math.random()*village.rows[i].code.length)]
				await interaction.reply(item);
			
	}
		await interaction.reply('Pong!');
	},
};
export default spawm;