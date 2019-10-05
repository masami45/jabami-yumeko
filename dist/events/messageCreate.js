"use strict";
const cooldowns = new Map();
module.exports = async (client, msg) => {
    if (msg.author.bot || msg.channel.type == 1)
        return;
    let prefix = process.env.BOT_PREFIX;
    let args = msg.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let ownerID = process.env.OWNER_ID.split(' ');
    if (/<@(!?)(429346525412589568)>/g.test(msg.content)) {
        msg.channel.createMessage(`My prefix is \`${prefix}\`\nExample: \`${prefix} random\``);
    }
    if (!msg.content.toLowerCase().startsWith(prefix))
        return undefined;
    let getCmd = client.commands.find((cmd) => cmd.id == command || cmd.aliases.indexOf(command) !== -1);
    if (!getCmd)
        return;
    if (getCmd.owner && !ownerID.includes(msg.author.id))
        return;
    if (!cooldowns.has(getCmd.id))
        cooldowns.set(getCmd.id, new Map());
    let now = Date.now();
    let timeStamp = cooldowns.get(getCmd.id) || new Map();
    let coolTime = getCmd.cooldown || 5;
    let userCool = timeStamp.get(msg.author.id) || 0;
    let estimated = userCool + (coolTime * 1000) - now;
    if (userCool && estimated > 0) {
        return msg.channel.createMessage(`**${msg.author.username}**, you have to wait **${(estimated / 1000).toFixed()}s** before use the same command again!`);
    }
    timeStamp.set(msg.author.id, now);
    cooldowns.set(getCmd.id, timeStamp);
    getCmd.run(msg, args, client);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZUNyZWF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ldmVudHMvbWVzc2FnZUNyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsTUFBTSxTQUFTLEdBQXFDLElBQUksR0FBRyxFQUFFLENBQUM7QUFFOUQsaUJBQVMsS0FBSyxFQUFFLE1BQWMsRUFBRSxHQUFZLEVBQUUsRUFBRTtJQUM1QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUM7UUFBRSxPQUFPO0lBRXBELElBQUksTUFBTSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQzVDLElBQUksSUFBSSxHQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUUsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pELElBQUksT0FBTyxHQUFhLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUd4RCxJQUFJLDhCQUE4QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbEQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sV0FBVyxDQUFDLENBQUM7S0FDMUY7SUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxTQUFTLENBQUM7SUFFcEUsSUFBSSxNQUFNLEdBQVksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUMvQyxHQUFHLENBQUMsRUFBRSxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTztJQUdwQixJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQUUsT0FBTztJQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUduRSxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0IsSUFBSSxTQUFTLEdBQXdCLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDM0UsSUFBSSxRQUFRLEdBQVcsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7SUFDNUMsSUFBSSxRQUFRLEdBQVcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RCxJQUFJLFNBQVMsR0FBVyxRQUFRLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRzNELElBQUksUUFBUSxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7UUFDM0IsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSwwQkFBMEIsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLHdDQUF3QyxDQUFDLENBQUM7S0FDMUo7SUFFRCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFBIn0=