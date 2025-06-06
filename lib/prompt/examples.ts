const exampleOne = `
Example Input 1
NPARKS-202501-1521562 - Bat
Mr Nuj
81234567
1 PINE CLOSE SINGAPORE 123456

Call FP on ETA

Thanks! ARC Mahesh

Activated JK Wildlife Jonathan 8:03 PM 1/16/2025

Expected Output 1
Activation: Urgent Bat Capture

FP Address: 1 Pine Close S123456

FP Name: Mr Nuj

FP Contact: 81234567

Case ID: NPARKS-202501-1521562

Activated By ARC: ARC Mahesh @ 2003hrs

JK Responding, ETA 60mins
`;

const exampleTwo = `
Example Input 2
NPARKS-202501-1514616
Civet Cat (Survey)

Name : Ms Chan
Contact: 91234567
Location: 20, BI HWAN DRIVE, SILVER HILL ESTATE, SINGAPORE 599012

Kindly called FP to give the ETA 

Thanks ARC Shank
*Called WM DO , DO advised to activate JK for survey 10:48 AM 1/3/2025
*Activate JKWildlife - 10:49 AM 1/3/2025

Expected Output 2
Activation: Urgent Civet Cat Survey

FP Address: 20 Bi Hwan Drive S599012

FP Name: Ms Chan

FP Contact: 91234567

Case ID: NPARKS-202501-1514616

Activated By ARC: ARC Shank @ 1049hrs

JK Responding, ETA 60mins
`;

const exampleThree = `
Example Input 3
NPARKS-202502-1534793
Black Snake (Survey)
Ms Tan
91234567
987, HOLLAND ROAD, SINGAPORE 987123
Activated JKW - Johnathan @ 7:45 PM 2/14/2025 
Thnks! ARC ADLYNN

Expected Output 3
Activation: Urgent Snake Survey

FP Address: 987 Holland Road, S987123

FP Name: Ms Tan

FP Contact: 91234567

Case ID: NPARKS-202502-1534793

Activated By ARC: ARC ADLYNN @ 1945hrs

JK Responding, ETA 60mins
`;

const exampleFour = `
Example Input 4
Snake activation 

Case: PARKS-202505-1582199

Name: Ms. Kai 
Contact: 98765432

Address:  HILLGROVE GARDENS
567 BUKIT BATOK STREET 99 HILLGROVE GARDENS SINGAPORE 123456
#-239

Called JK wildlife spoke to Jonathan activation done @ 3:57 PM 17-May-25

THANKS ARC EVE

Expected Output 4
Activation: Urgent Snake Capture

FP Address: 567 Bukit Batok Street 99 #-239 S123456

FP Name: Ms. Kai

FP Contact: 98765432

Case ID: NPARKS-202505-1582199

Activated By ARC: ARC EVE @ 1557hrs

JK Responding, ETA 60mins
`;

const exampleFive = `
Example Input 5
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

Expect Output 5
Activation: Urgent Civet Cat Capture [should be Urgent Civet Transport]

Case ID: NPARKS-202505-1587646

FP Name: Mr Welly Chandra

FP Contact: 91234567

FP Address: 98 Jalan Buloh Perindu S123456

Activated By ARC: ARC Chairul [timing is missing also, should be 1808hrs]

JK Responding, ETA 60mins
`;

const allExamplesArray = [
  exampleOne,
  exampleTwo,
  exampleThree,
  exampleFour,
  exampleFive,
];

let allExamples = ``;

allExamplesArray.forEach((example) => {
  allExamples += example.trim() + "\n\n";
});

export default allExamples.trim();
