import { allExamples } from "./examples";

const { exampleOne, exampleTwo, exampleThree, exampleFour, exampleFive } =
  allExamples;

/// Contains the JSON structure of the prompt to be sent
const promptJson = {
  task: "You are an employee in a wildlife response company. You will receive messages from a call centre activating you for response. The messages differ in format but always contain the same key fields. Extract each field and return each on its own line, with an extra blank line between fields.",
  expectedOutputFormattingRule:
    "Return each field on its own line using the field name exactly as shown, followed by a colon and the extracted value. Insert an extra blank line between each field.",
  expectedOutputFormat: `
  Activation:

  Address:

  FP Name:

  FP Contact:

  Case ID:

  Activated by ARC:

  JK Responding, ETA 60mins
  `,
  rulesForEachField: {
    activation: [
      "Combine urgency (Urgent or Non-Urgent; default Urgent) with case type (e.g., Capture, Survey, Transport, Carcass Removal",
      "If there is mention of CONFINED or CONTAINED, it means Transport. For example 'Snake capture (confined)', 'Confined snake', 'Snake capture (contained)' all become 'Snake Transport'.",
      "If there is mention of SURVEILLANCE, it means survey. For example 'Snake in Premise (Surveillance)', 'Snake surveillance' all become 'Snake Survey'.",
      "Default is Capture if no case type mentioned.",
      "Remove adjectives from animal type. For example, 'Black Snake Survey' becomes 'Snake Survey'; 'Injured monitor lizard capture' becomes 'monitor lizard capture'",
    ],
    address: [
      "Remove punctuation.",
      "Only capitalise the first letter of each word.",
      "A valid address should include a block number, a recognised street type (e.g., Street, Road, Drive, Close, Avenue, Lane), and optionally a unit number or postal code.",
      `Exclude estate or development names like "Hillgrove Gardens", "Citylife @ Tampines", or "Casa Clementi"; these would mostly be standalone or prefix-style names and are not part of the street address.`,
      "If an estate name appears in the same line as the street, remove only the estate name.",
      "Format postal codes as S<postal>",
      "If the unit number is incomplete, output it exactly as written.",
      "Put the unit number before the postal code.",
    ],
    fpName: [
      "FP means feedback provider which is the person that called for help",
      "Only capitalise the first letter of the name and any subsequent surnames",
    ],
    fpContact:
      "The feedback provider's contact number which is usually and eight digit number starting with 8 or 9",
    caseId: [
      "Should always start with NPARKS-.",
      "If the original case ID starts with PARKS- or omits the prefix, correct it to begin with NPARKS-.",
      "Keep the rest of the ID intact.",
    ],
    activatedByArcAtTime: [
      "For context: ARC is the name of the call centre and the message should contain the name of the person from ARC who activated the company.",
      `Start this field with: "ARC [name of the ARC staff]" and then "@ [time]`,
      `If no ARC call time was provided then remove the "@ [time]" portion`,
      "Convert time to 24 hour format and display as HHmmhrs; some examples: 18:08 reformats as 1808hrs, 1109pm reformats as 2309hrs",
      `The time information is usually found in this format: "Activated by ARC John @ 00:35"`,
      `There might be instances where the activation time is found in sentences like "Spoken with Ben - 27/05/2025, 18:08" instead of "Activated by ARC Tim @ 18:08"`,
    ],
    jkResponding:
      "This is the default ending of the message. Do not need to change this or do anything special",
  },
  examples: {
    exampleOne: { ...exampleOne },
    exampleTwo: { ...exampleTwo },
    exampleThree: { ...exampleThree },
    exampleFour: { ...exampleFour },
    exampleFive: { ...exampleFive },
  },
};

export default promptJson;
