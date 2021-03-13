export default (input_array, bins=10) => {

    
    if (input_array.length > 0)
    {
        // console.log(input_array)
        // console.log(Math.max(...input_array))


        let max_val = Math.max(...input_array);
        // console.log("max_val", max_val)
        // console.log(Math.ceil(max_val))
        // console.log(Math.ceil(max_val/bins))
        let to_return_b = new Array( Math.ceil(max_val/bins) ).fill(0);
        // let to_return = [];

        for (let i = 0; i < input_array.length; i++) {
            // const element = input_array[i];
            to_return_b[Math.floor(input_array[i]/1000)] += 1
        }
        return to_return_b
        // return [{x:0, y:0}, {x:10, y:10}]
    }
    else
    {
        return []
    }

}



// function digitize(x, bins, { right = false } = {}) {
//     let i, bin;
//     const results = [];
    
//     const inBin = right
//       // bins[i-1] < x <= bins[i]
//       ? (leftBin, x, rightBin) => leftBin < x && x <= rightBin
//       // bins[i-1] <= x < bins[i]
//       : (leftBin, x, rightBin) => leftBin <= x && x < rightBin
//     ;
  
//     x.forEach(val => {
//       if (Array.isArray(val)) {
//         return void results.push(digitize(val, bins, right));
//       }
//       bin = 1;
//       for (i = 1; i < bins.length; i++) {
//         if (inBin(bins[i-1], val, bins[i])) {
//           bin = i;
//           //console.log(`inBin:, i:${i}, bin:${bin} left:${bins[i-1]} <= ${val} <= ${bins[i]}`);
//           break;
//         }
//       }
//       if (val >= bins[bins.length-1]) bin = right ? bins.length - 1 : bins.length;
//       results.push(bin);
//     });
    
//     return results;
//   }
  
//   function test(name, fn, inputs, outputs) {
//     const result = fn.apply(null, inputs);
//     const resultJSON = JSON.stringify(result);
//     const outputJSON = JSON.stringify(outputs);
//     resultJSON === outputJSON ? console.log(`${name} matches!`)
//       : console.log(name, ':', resultJSON.substr(0, 200), 'DOES NOT MATCH:', outputJSON.substr(0, 200), 'inputs:', JSON.stringify(inputs).substr(0, 200))
//     ;
//   }
  
//   test('1d array ltr', digitize, [
//     [0.2, 6.4, 3.0, 1.6],
//     [0.0, 1.0, 2.5, 4.0, 10.0], { right: false }
//   ], [1, 4, 3, 2]);
  
//   test('1d v2 array ltr', digitize, [
//     [1.2, 10.0, 12.4, 15.5, 20.],
//     [0, 5, 10, 15, 20], { right: false }
//   ], [1, 3, 3, 4, 5]);
  
//   test('1d v2 array rtl', digitize, [
//     [1.2, 10.0, 12.4, 15.5, 20.],
//     [0, 5, 10, 15, 20], { right: true }
//   ], [1, 2, 3, 4, 4]);
  
//   test('2d ltr', digitize, [[
//     [1, 2, 3, 4, 5],
//     [1, 2, 3, 4, 5],
//     [1, 2, 3, 4, 5]
//   ], [1, 3, 5], { right: false }], [[1, 1, 2, 2 ,3],
//    [1, 1, 2 ,2, 3],
//    [1, 1, 2, 2, 3]]);

   

