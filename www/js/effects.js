var effects = {
    'gray': function(data){
        for(var i=0;i<data.length;i+=4){
            var r = data[i];
            var g = data[i+1];
            var b = data[i+2];
            var brightness = (3*r+4*G+b)>>>3;
            data[i] = brightness;
            data[i+1] = brightness;
            data[i+2] = brightness;
        }
    },
    'negative': function(data){
        for(var i=0; i<data.length; i+=4){
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
    },
    'sepia':function(data){
        var r = [0,0,0,1,1,2,3,3,3,4,4,4,5,5,5,6,6,7,7,7,7,8,8,8,9,9,9,9]
        g = [0,0,1,2,2,3,5,5,6,7,8,8,10,11,11,12,13,15,15,16,17,18,18,19]
        b = [53,53,53,54,54,54,55,55,55,56,57,57,57,58,58,58,59,59,59,60,61]

        for (var i=0; i< data.length;i+=4){
            data[i] = r[data[i]];
            data[i+1] = g[data[i+1]];
            data[i+2] = b[data[i+2]];

            var noise = 20;
            if (noise > 0) {
                var noise = Math.round(noise - Math.random() * noise);
                for(var j=0; j<3; j++){
                    var iPN = noise + data[i+j];
                    data[i+j] = (iPN > 255) ? 255 : iPN;
                }
            }
        };
    }
}