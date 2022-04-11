import { SlashCommandBuilder } from'@discordjs/builders';

const spawms = {
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
export default spawms;