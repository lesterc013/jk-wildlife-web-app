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
    fpName:
      "FP means feedback provider which is the person that called for help",
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
    exampleOne: {
      input: `
      NPARKS-202501-1521562 - Bat
      Mr Nuj
      81234567
      1 PINE CLOSE SINGAPORE 123456

      Call FP on ETA

      Thanks! ARC Mahesh

      Activated JK Wildlife Jonathan 8:03 PM 1/16/2025
      `,
      expectedOutput: `
      Activation: Urgent Bat Capture

      FP Address: 1 Pine Close S123456

      FP Name: Mr Nuj

      FP Contact: 81234567

      Case ID: NPARKS-202501-1521562

      Activated By ARC: ARC Mahesh @ 2003hrs

      JK Responding, ETA 60mins
      `,
    },
    exampleTwo: {
      input: `
      NPARKS-202501-1514616
      Civet Cat (Survey)

      Name : Ms Chan
      Contact: 91234567
      Location: 20, BI HWAN DRIVE, SILVER HILL ESTATE, SINGAPORE 599012

      Kindly called FP to give the ETA 

      Thanks ARC Shank
      *Called WM DO , DO advised to activate JK for survey 10:48 AM 1/3/2025
      *Activate JKWildlife - 10:49 AM 1/3/2025
      `,
      expectedOutput: `
      Activation: Urgent Civet Survey

      FP Address: 20 Bi Hwan Drive S599012

      FP Name: Ms Chan

      FP Contact: 91234567

      Case ID: NPARKS-202501-1514616

      Activated By ARC: ARC Shank @ 1049hrs

      JK Responding, ETA 60mins
      `,
    },
    exampleThree: {
      input: `
      NPARKS-202502-1534793
      Black Snake (Survey)
      Ms Tan
      91234567
      987, HOLLAND ROAD, SINGAPORE 987123
      Activated JKW - Johnathan @ 7:45 PM 2/14/2025 
      Thnks! ARC ADLYNN
      `,
      expectedOutput: `
      Activation: Urgent Snake Survey

      FP Address: 987 Holland Road, S987123

      FP Name: Ms Tan

      FP Contact: 91234567

      Case ID: NPARKS-202502-1534793

      Activated By ARC: ARC ADLYNN @ 1945hrs

      JK Responding, ETA 60mins
      `,
    },
    exampleFour: {
      input: `
      Snake activation 

      Case: PARKS-202505-1582199

      Name: Ms. Kai 
      Contact: 98765432

      Address:  HILLGROVE GARDENS
      567 BUKIT BATOK STREET 99 HILLGROVE GARDENS SINGAPORE 123456
      #-239

      Called JK wildlife spoke to Jonathan activation done @ 3:57 PM 17-May-25

      THANKS ARC EVE
      `,
      expectedOutput: `
      Activation: Urgent Snake Capture

      FP Address: 567 Bukit Batok Street 99 #-239 S123456

      FP Name: Ms. Kai

      FP Contact: 98765432

      Case ID: NPARKS-202505-1582199

      Activated By ARC: ARC EVE @ 1557hrs

      JK Responding, ETA 60mins
      `,
    },
    exampleFive: {
      input: `
      NPARKS-202505-1587646
      Civet cat activation [Confined]

      Mr. Welly Chandra
      91234567
      Location
      SEASIDE PARK
      98 JALAN BULOH PERINDU SEASIDE PARK SINGAPORE 123456

      Spoken with Ben - 27/05/2025, 18:08
      Activation by WL DO Joey

      Thanks - ARC Chairul
      `,
      expectedOutput: `
      Activation: Urgent Civet Transport

      Case ID: NPARKS-202505-1587646

      FP Name: Mr Welly Chandra

      FP Contact: 91234567

      FP Address: 98 Jalan Buloh Perindu S123456

      Activated By ARC: ARC Chairul @ 1808hrs

      JK Responding, ETA 60mins
      `,
    },
  },
};

export default promptJson;
