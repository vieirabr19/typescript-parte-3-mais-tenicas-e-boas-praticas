export function logarTempoDeExcucao(emSegundos: boolean = false) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function(...args: any[]) {
      let divisor = 1;
      let unidade = 'Milisegundos';
      if(emSegundos){
        divisor = 1000;
        unidade = 'Segundos';
      }
      const t1 = performance.now();
      const retorno = metodoOriginal.apply(this, args);
      const t2 = performance.now();
      console.log(`${propertyKey}: tempo de execuçao: ${(t2 - t1) / divisor} ${unidade}`);
      retorno;
    }

    return descriptor;
  }
}