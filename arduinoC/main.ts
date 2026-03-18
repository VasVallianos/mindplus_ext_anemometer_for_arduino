\  
 
enum ANALOG_PORTS {
    //% block="A0"
    A0,
    //% block="A1"
    A1,
	//% block="A2"
    A2,
    //% block="A3"
    A3,
	
}

//% color="#5383b5" iconWidth=50 iconHeight=40
namespace windsens {
    //% block="Διάβασε την ταχύτητα του ανέμου σε m/s στο pin [PIN]" blockType="reporter"
	//% PIN.shadow="dropdown" PIN.options="ANALOG_PORTS" PIN.defl="ANALOG_PORTS.A0"
    export function getWindSpeed(parameter: any, block: any) {
		let pin = parameter.PIN.code;
        if(Generator.board === 'arduino'){
            Generator.addCode(`(analogRead(${pin}) * (5.0 / 1023.0) * 6.0)`);
        }
    }
	
	//% block="Διάβασε την ταχύτητα του ανέμου στην κλίμακα Μποφόρ στο pin [PIN]" blockType="reporter"
	//% PIN.shadow="dropdown" PIN.options="ANALOG_PORTS" PIN.defl="ANALOG_PORTS.A0"
	export function getBeaufort(parameter: any, block: any) {
		let pin = parameter.PIN.code;
		if (Generator.board === 'arduino') {
			Generator.addInclude(`beaufortScale`,
				`int beaufortScale(float mps) {\n` +
				`  if (mps < 0.3)  return 0;\n` +
				`  if (mps < 1.6)  return 1;\n` +
				`  if (mps < 3.4)  return 2;\n` +
				`  if (mps < 5.5)  return 3;\n` +
				`  if (mps < 8.0)  return 4;\n` +
				`  if (mps < 10.8) return 5;\n` +
				`  if (mps < 13.9) return 6;\n` +
				`  if (mps < 17.2) return 7;\n` +
				`  if (mps < 20.8) return 8;\n` +
				`  if (mps < 24.5) return 9;\n` +
				`  if (mps < 28.5) return 10;\n` +
				`  if (mps < 32.7) return 11;\n` +
				`  return 12;\n` +
				`}`
			);
			Generator.addCode(`beaufortScale(analogRead(${pin}) * (5.0 / 1023.0) * 6.0)`);
    }
}
}

