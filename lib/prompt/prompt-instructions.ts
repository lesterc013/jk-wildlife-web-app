import examples from "./examples";

const preamble =
  "You are an employee in a wildlife response company. You will receive messages activating you for response. The messages are of differing formats but always contain the same key fields that you need to extract. FP means feedback provider which is the person that called for help. Return each field on its own line with an extra line break between each line exactly as shown in the examples.";

const extractionRules = `
  Extract the following fields clearly:

- Activation: Combine urgency (Urgent or Non-Urgent; default Urgent) with case type (e.g., Capture, Survey, Transport, Carcass Removal; If there is mention of CONFINED or CONTAINED, it means Transport. For example 'Snake capture (confined)', 'Confined snake', 'Snake capture (contained)' all become 'Snake Transport'. If there is mention of SURVEILLANCE, it means suvey. For example 'Snake in Premise (Surveillance)', 'Snake surveillance' all become 'Snake Survey'. Default is Capture if no case type mentioned). Remove adjectives from animal type. For example, 'Black Snake Survey' becomes 'Snake Survey'; 'Injured monitor lizard capture' becomes 'monitor lizard capture'.

- Address: Remove punctuation. Only capitalise the first letter of each word. Exclude estate or development names like “Hillgrove Gardens”, “Citylife @ Tampines”, or “Casa Clementi”. These are standalone or prefix-style names not part of the street address. A valid address should include a block number, a recognised street type (e.g., Street, Road, Drive, Close, Avenue, Lane), and optionally a unit number or postal code. If an estate name appears in the same line as the street, remove only the estate name. Format postal codes as S<postal>. If the unit number is incomplete, output it exactly as written. Put the unit number before the postal code

- FP Name:

- FP Contact:

- Case ID: Should always start with NPARKS-. If the original case ID starts with PARKS- or omits the prefix, correct it to begin with NPARKS-. Keep the rest of the ID intact.

- Activated By ARC @ Time. If no ARC time was provided then remove the @ Time portion; convert time to 24 hour format. There might be instances where the activation time is found in sentences like "Spoken with Ben - 27/05/2025, 18:08" instead of "Activated by ARC Tim @ 18:08"

- JK Responding, ETA 60mins (60mins is the default)

If any field is missing or unclear, return "N/A" for that field.
Only return the fields in the given format. Do not explain
  `;

const promptInstructions = `
${preamble.trim()}
\n\n
${extractionRules.trim()}
\n\n
${examples}
`;

export default promptInstructions;
