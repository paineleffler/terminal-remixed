/**
 * command must be in format:
 * node text.js <sender phone number> <content>
 * @param {string} command
 * @param {fetcher} fetcher 
*/

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

export default async function TextMessage (command, fetcher) {
  const args = command.split(' ')

  if (args.length < 4) {
    return 'ERROR Usage: node text.js <sender phone number> <message content>'
  } else if (!phoneRegex.test(args[2])) {
    return 'ERROR Invalid phone number: please provide a valid phone number.'
  } else if (command.length > 300) {
    return 'ERROR Content length: please keep your message under 300 characters.'
  } else {
    const message = `FROM: ${args[2]} MESSAGE: ${command.split(`${args[0]} ${args[1]} ${args[2]}`)[1]}`
    fetcher.submit({ text: message }, { method: "post", action: '/?index' }); 
    return 'Your message was sent!'
  }
}
