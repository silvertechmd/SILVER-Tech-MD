const fs = require('fs');
const path = require('path');

const warningsFilePath = path.join(__dirname, '../data/warnings.json');

function loadWarnings() {
    if (!fs.existsSync(warningsFilePath)) {
        fs.writeFileSync(warningsFilePath, JSON.stringify({}), 'utf8');
    }
    const data = fs.readFileSync(warningsFilePath, 'utf8');
    return JSON.parse(data);
}

async function warningsCommand(sock, chatId, mentionedJidList) {
    const warnings = loadWarnings();

    if (mentionedJidList.length === 0) {
        await sock.sendMessage(chatId, { text: 'Please mention a user to check warnings.' });
        return;
    }

    const userToCheck = mentionedJidList[0];
    const warningCount = warnings[userToCheck] || 0;

    await sock.sendMessage(chatId, { text: `User has ${warningCount} warning(s).` });
}

module.exports = warningsCommand;
            fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));

            const warningMessage = 
`🔰 *SILVER-TECH-BOT-V2 WARNING SYSTEM*

🚨 *Warning Issued!*

👤 *User:* @${userToWarn.split('@')[0]}
⚠️ *Warnings:* ${warnings[chatId][userToWarn]}/3
🛡️ *Warned By:* @${senderId.split('@')[0]}
🕒 *Time:* ${new Date().toLocaleString()}`;

            await sock.sendMessage(chatId, { 
                text: warningMessage,
                mentions: [userToWarn, senderId]
            });

            if (warnings[chatId][userToWarn] >= 3) {
                await new Promise(resolve => setTimeout(resolve, 1000));

                await sock.groupParticipantsUpdate(chatId, [userToWarn], "remove");
                delete warnings[chatId][userToWarn];
                fs.writeFileSync(warningsPath, JSON.stringify(warnings, null, 2));
                
                const kickMessage = 
`🔰 *SILVER-TECH-BOT-V2 WARNING SYSTEM*

❌ @${userToWarn.split('@')[0]} has been *removed* from the group after reaching 3 warnings.`;

                await sock.sendMessage(chatId, { 
                    text: kickMessage,
                    mentions: [userToWarn]
                });
            }
        } catch (error) {
            console.error('🛑 Error in warn command:', error);
            await sock.sendMessage(chatId, { 
                text: '🛑 Failed to warn user!\n🔰 *SILVER-TECH-BOT-V2 WARNING SYSTEM*'
            });
        }
    } catch (error) {
        console.error('Error in warn command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await sock.sendMessage(chatId, { 
                text: '🛑 Rate limit reached. Try again shortly.\n🔰 *SILVER-TECH-BOT-V2 WARNING SYSTEM*'
            });
        } else {
            await sock.sendMessage(chatId, { 
                text: '🛑 Unexpected error occurred. Ensure bot has admin rights.\n🔰 *SILVER-TECH-BOT-V2 WARNING SYSTEM*'
            });
        }
    }
}

module.exports = warnCommand;
