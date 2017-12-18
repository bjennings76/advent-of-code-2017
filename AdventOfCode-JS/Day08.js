"use strict";
// http://adventofcode.com/2017/day/8
Object.defineProperty(exports, "__esModule", { value: true });
exports.title = "Day 8";
exports.solve = function (input) {
    var registers = {};
    var highestEver = 0;
    var getHighest = function () { return Object.keys(registers).map(function (k) { return registers[k]; }).reduce(function (h, v) { return Math.max(h, v); }, 0); };
    input.split('\n').map(function (i) { return new Instruction(i, registers); }).forEach(function (i) {
        i.run();
        highestEver = Math.max(getHighest(), highestEver);
    });
    var highest = getHighest();
    console.log("Part 1: Highest = " + highest);
    console.log("Part 2: Highest Running = " + highestEver);
};
var Instruction = /** @class */ (function () {
    function Instruction(input, registers) {
        this.registers = registers;
        var match = input.match(/^(\w+) (inc|dec) ([-0-9]+) if (\w+) ([^\s]+) ([-0-9]+)/);
        this.register = match[1];
        this.mod = match[2] == "dec" ? -Number(match[3]) : Number(match[3]);
        this.checkRegister = match[4];
        this.checkTest = match[5];
        this.checkValue = Number(match[6]);
        this.registers[this.register] = this.registers[this.register] || 0;
        this.registers[this.checkRegister] = this.registers[this.checkRegister] || 0;
    }
    Instruction.prototype.run = function () { if (this.check())
        this.registers[this.register] += this.mod; };
    Instruction.prototype.check = function () {
        var a = this.registers[this.checkRegister];
        var b = this.checkValue;
        switch (this.checkTest) {
            case "<":
                return a < b;
            case "<=":
                return a <= b;
            case ">":
                return a > b;
            case ">=":
                return a >= b;
            case "==":
                return a == b;
            case "!=":
                return a != b;
            default:
                throw ("Don't recognize " + this.checkTest);
        }
    };
    return Instruction;
}());
exports.inputs = [
    "b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10",
    "utc dec -736 if p > -7\ntn inc -876 if qlm == 4\nuz dec 294 if l < 10\na inc -904 if me >= -7\ntn inc 622 if ppl <= 6\nfr dec 17 if ufk > -10\nhkt inc -511 if mdk == 0\nt inc -290 if xxh <= -1\nl dec 727 if ufk < 7\ntn inc -576 if l == -727\nz inc 464 if dea >= -2\nufk inc 755 if utc >= 735\nutc dec -720 if qlm <= 5\na dec -277 if ufk <= 755\nxxh dec -640 if u == 0\nhkt inc 875 if m != -6\nny inc -351 if p >= -4\nl inc 674 if dea > -7\nufk dec -826 if p == 0\nmdk inc 377 if utc == 1456\nppl dec 793 if q <= 4\nz dec 114 if mdk > 368\nny dec -412 if ny >= -353\nutc dec 176 if a != -620\nutc dec -610 if p <= 1\nl inc -541 if xxh <= 635\nl inc 102 if ny < 66\nqlm dec 700 if l >= 43\ndea dec -202 if tn <= 38\na inc 785 if a <= -629\nny inc 414 if fr <= -21\nl inc 250 if hw <= -10\nl inc -516 if l > 41\nutc dec 358 if mdk > 373\np dec -38 if z == 350\nuz dec -71 if a == -627\nt inc -713 if fr > -13\nl inc 242 if tn <= 53\ndea dec 600 if hw <= 8\nhw dec -92 if fr != -19\nhkt dec 67 if l <= -232\nqlm dec 523 if hw == 92\nutc dec -608 if q != -8\nm dec 314 if me < 9\nxxh inc -937 if xxh >= 638\nqlm dec 494 if m <= -313\nfr dec -590 if m <= -306\nutc inc -539 if tn == 46\nhkt dec 831 if p >= 43\ndea inc 510 if a > -627\np inc 319 if m > -305\nm inc 736 if xxh >= -302\nppl inc -712 if mdk == 377\nny inc 21 if p <= 41\nhw inc -569 if hw != 92\nppl inc 150 if dea < -595\nxxh dec -953 if z != 356\nppl inc 578 if qlm <= -1714\nuz dec -733 if p >= 35\nxxh inc 100 if xxh >= 660\nhw dec -491 if ppl < -767\nt dec -64 if z < 347\nme dec 802 if dea > -601\nhkt inc 431 if hkt > 359\nutc inc -600 if q != 0\nu inc -223 if tn < 48\ntn inc 443 if uz <= 513\nl inc -349 if ny == 82\nutc inc -499 if xxh <= 661\na inc 600 if hw >= 578\nz dec -636 if utc > 1099\ntn inc 75 if z == 986\nhkt dec 364 if mdk < 377\nufk inc 249 if fr == 573\nl inc -429 if uz > 507\nhw dec -621 if ppl == -778\nl inc -620 if z != 980\nl inc 319 if tn == 564\nq dec -478 if ny <= 82\nutc dec -169 if uz < 519\nfr inc 124 if dea >= -607\nm dec -674 if p != 28\nm dec 744 if p != 44\nl dec -620 if hw <= 582\nutc dec -950 if p >= 37\nuz dec -122 if xxh < 660\nl inc -563 if z < 996\nhkt inc -514 if m <= 361\nl dec 525 if mdk == 377\nxxh inc -666 if u != -228\na inc 934 if a <= -23\na inc 817 if xxh >= -11\nme inc 450 if tn < 563\nhw inc 475 if xxh < -1\nfr dec 493 if xxh < -8\nuz inc -985 if qlm > -1724\nppl inc 856 if qlm >= -1720\nhw inc -368 if me > -804\nny dec -219 if p != 38\nu inc 1000 if ny > 79\nq dec 551 if hkt == 281\nuz dec 317 if dea >= -600\nuz inc -916 if qlm <= -1726\nhkt dec 915 if mdk != 380\nmdk inc 484 if l == -2392\nxxh inc 326 if dea > -607\nu dec -803 if me > -811\nq dec 689 if tn != 565\nhw dec 908 if p == 38\nz inc -173 if ppl > 72\nz dec 371 if tn < 565\np inc 185 if u > 1571\na inc 490 if mdk != 864\ntn dec -27 if u == 1580\nqlm inc 77 if m > 345\np dec 364 if ufk <= 1836\ndea dec 308 if me == -802\na inc -345 if hw == -218\nny inc 603 if p <= -138\nfr inc -4 if utc > 2217\nme inc 118 if hkt <= -626\nhw inc -590 if z < 443\nme dec 279 if q <= -756\nme inc -50 if dea == -908\nppl inc 708 if u <= 1586\nt inc -429 if mdk >= 854\nm dec -372 if uz > -676\nfr dec -840 if ppl == 787\nqlm dec -442 if tn != 584\nu dec 227 if l == -2402\nm inc 279 if z <= 446\nxxh inc -951 if t > -421\nt dec 530 if xxh != 317\nfr inc -621 if mdk <= 869\na dec 480 if fr < 424\nq inc 988 if l == -2384\nu inc 313 if q < -757\nhw dec 237 if hkt == -634\nmdk dec 945 if t > -969\nme inc 631 if ny >= 679\nny dec -740 if uz == -670\nt inc -310 if utc > 2213\np dec -453 if utc >= 2218\nmdk inc -266 if hw == -1045\na inc -887 if qlm == -1198\nppl dec 521 if t >= -1270\ndea dec -685 if xxh != 310\nl inc -472 if m < 1013\nufk inc -920 if l <= -2860\nu dec -503 if me <= -373\nufk inc 547 if m > 998\nl inc -287 if p <= 309\nqlm dec -173 if q <= -755\nu dec -928 if z > 437\nhw inc 43 if hkt < -626\nutc inc -694 if me == -382\nfr dec -938 if tn > 584\nq inc 9 if mdk == -350\ndea inc 119 if m < 1012\nny dec 210 if ufk <= 1465\nxxh inc 352 if q > -758\ndea inc 483 if hkt >= -639\ntn inc -652 if t >= -1266\nufk inc 674 if ny >= 1207\nppl dec 311 if z >= 442\nqlm inc 655 if m < 1005\nz dec 580 if uz < -661\nutc inc -977 if ppl <= -36\nxxh inc -25 if l == -2864\nme dec 252 if uz > -674\nmdk dec -98 if z <= -129\np inc -276 if utc < 541\nhw dec 796 if xxh <= 649\nq inc -726 if z != -137\nfr dec 433 if ufk <= 2140\nhw inc -701 if z < -131\nhw dec 587 if mdk <= -244\nny dec -734 if mdk <= -249\nqlm dec -311 if utc != 546\nufk dec -405 if q > -1481\np dec 97 if t != -1275\nt dec 597 if qlm >= -49\nufk dec 389 if uz < -660\nl inc 765 if a < 504\nfr dec -948 if tn >= 586\nqlm dec 79 if m > 997\nny inc 764 if p < 225\na dec 419 if m != 1003\nq dec -860 if q != -1475\nfr inc 426 if hw > -3080\nufk inc 0 if ppl != -36\nutc inc 939 if p >= 206\nm inc 830 if xxh < 650\nm inc -511 if hw > -3091\nu inc -720 if qlm > -134\ndea inc -147 if a <= 503\nu inc -322 if tn != 591\nny dec 900 if ny != 2713\nny inc -737 if me == -634\nfr inc -494 if l != -2097\nmdk inc -363 if ny != 1976\nl inc 991 if hkt > -636\nl dec 179 if dea != 232\nq dec -264 if ny != 1977\nl dec -976 if uz > -667\ntn inc 791 if hkt > -637\nppl dec 225 if utc < 1495\nuz dec -527 if m > 1317\na inc -644 if me < -624\nuz inc 160 if q >= -361\nu inc 577 if xxh > 650\nq inc 124 if xxh < 653\nl inc 268 if dea > 222\nhw inc 795 if uz < 10\nuz dec 934 if uz < 26\ntn inc 966 if ufk == 2150\nme dec -71 if p <= 222\nme inc 186 if ppl > -270\nm dec -377 if xxh <= 649\nny dec 275 if mdk > -248\nqlm dec -574 if fr != 1371\nutc dec 78 if xxh > 638\nl inc 494 if u > 3315\ntn dec -595 if qlm > 435\ntn dec 113 if a <= -140\nfr inc -610 if ufk < 2148\nuz inc -791 if u != 3334\nuz inc 356 if t < -1276\nl dec -463 if utc < 1414\ntn inc -266 if a < -137\np inc 747 if utc >= 1402\nz inc -671 if hkt == -634\ntn inc -441 if u != 3324\nfr inc 172 if hkt > -638\ntn dec -558 if qlm < 439\na dec -234 if tn <= 2155\nt inc -325 if l >= 126\nt dec -685 if l > 110\nufk inc -912 if z < -805\nufk dec 0 if fr < 941\nfr dec 276 if a == -142\nxxh inc -972 if p < 967\nufk inc 188 if mdk >= -245\nme inc -255 if t > -583\nqlm inc 451 if uz > -1710\nfr inc -921 if z >= -814\nq inc 272 if uz < -1705\nu dec 216 if p <= 956\na inc 30 if z > -812\ntn dec -202 if dea == 232\nm inc 792 if ny != 1976\nuz dec -867 if z == -809\nppl inc -765 if qlm != 894\nhkt inc 301 if xxh < -322\np dec -839 if dea == 232\nutc dec -920 if m > 1694\na inc -206 if mdk == -252\nny dec -545 if ppl <= -1029\nme dec -860 if q >= 39\nufk inc 644 if tn <= 2359\nhw dec 959 if t == -584\nqlm dec 667 if xxh != -321\nufk inc 598 if a > -323\nppl dec -514 if hw <= -4039\nuz dec 708 if p == 1801\nhw inc -902 if hkt != -333\nqlm dec 249 if tn != 2366\nmdk inc -570 if z > -812\nfr inc -47 if tn > 2350\nme inc -62 if hw != -4037\nqlm dec 796 if dea > 239\nq dec -201 if ppl == -521\nz inc 265 if ufk != 2481\nhw dec 597 if q >= 239\nny dec 417 if uz > -1540\nhkt dec -866 if m <= 1704\nm inc 103 if m == 1699\nufk inc -733 if qlm <= -28\nmdk dec -416 if z > -546\nufk dec 477 if z < -543\nl dec 224 if m < 1799\nq inc 646 if u < 3327\nhkt dec -501 if qlm != -29\nppl inc 321 if p > 1797\na dec 678 if ufk == 1268\nu inc -878 if fr > -302\nt dec 523 if uz != -1552\nmdk dec -490 if fr != -304\np dec -603 if ufk >= 1264\ntn inc -234 if qlm > -33\nmdk dec -51 if q <= 881\na inc 672 if me < 244\nz dec 473 if m != 1797\nmdk dec -727 if utc == 2331\nppl inc -59 if me == 235\na dec -937 if uz <= -1547\nuz dec -352 if m >= 1798\nfr inc 693 if utc < 2333\nt inc 493 if hkt != 526\nhw inc 86 if hkt >= 533\nt dec 49 if ny != 2512\nutc inc 273 if me != 235\nxxh inc -871 if dea == 232\nz dec -707 if dea != 234\nmdk dec 362 if ny > 2528\ntn inc -825 if t <= -658\nuz dec 655 if xxh < -1195\ndea dec 231 if me < 242\nmdk dec -260 if xxh != -1200\nppl dec -842 if mdk != 321\nl inc -957 if qlm == -23\nm dec 393 if ny > 2515\nufk inc -648 if me < 243\ndea inc -251 if fr < 399\na inc 772 if mdk < 323\nhkt inc 997 if fr > 383\nl dec 13 if dea == -240\nhkt dec -935 if tn >= 1291\nuz dec 992 if u < 3324\nhw dec -970 if t <= -655\nm inc 132 if mdk == 321\nhw inc 908 if hkt > 2464\nme inc -975 if l != 119\nny dec -76 if dea >= -251\nppl dec -844 if u >= 3322\nqlm dec 286 if ny >= 2597\nxxh dec 903 if uz != -1843\nu dec 992 if hkt <= 2471\ntn dec -663 if me > -735\nny dec -598 if ppl >= 583\nm inc 84 if mdk != 318\nufk inc -260 if t <= -668\nu dec -443 if fr >= 388\nl dec -116 if hw <= -2670\nm inc 816 if dea < -240\nt inc 319 if mdk != 317\nme inc -681 if z < -301\nm inc 451 if uz != -1845\nt inc 472 if mdk <= 330\nqlm inc -125 if z == -310\nufk inc -419 if p > 2401\nl dec -7 if xxh <= -2096\nm dec 325 if fr < 380\nmdk inc -391 if hkt <= 2465\nxxh inc 491 if z != -315\np inc -832 if utc > 2324\nt dec 304 if a > 2056\nxxh dec 107 if dea < -243\nl inc 220 if hw < -2681\np dec -316 if p > 1565\nmdk inc 333 if utc == 2332\nppl dec 961 if a >= 2055\nfr inc 230 if z <= -310\nhkt dec -715 if fr >= 615\nl inc -466 if p <= 1888\nqlm inc 185 if xxh >= -1725\nu inc -710 if t == -168\nz inc 15 if ppl < -371\nutc inc 422 if hw < -2683\nfr dec 688 if t > -181\nmdk dec 606 if a < 2064\nme dec 323 if z <= -289\nppl dec 150 if uz > -1844\nt inc 617 if q > 879\nhw inc -212 if qlm != -255\na inc 338 if m <= 2901\nutc dec 545 if l < -228\ntn dec 407 if z > -303\nmdk dec 784 if ppl >= -378\nq inc -352 if z == -295\nuz inc -644 if ppl <= -372\nfr dec 209 if dea < -242\ntn dec -605 if p >= 1879\nhkt dec 77 if mdk != -1470\nhw dec -280 if hw < -2676\nufk dec 375 if qlm >= -248\np inc -958 if xxh <= -1710\na inc 653 if z != -295\nutc inc 493 if qlm == -255\nxxh dec -649 if q > 530\nz inc -993 if me != -1749\nt inc 119 if mdk <= -1451\nufk dec 883 if utc <= 2825\nm inc -545 if qlm == -255\ntn inc 626 if dea != -253\ntn dec -111 if p > 923\ntn inc -719 if u <= 2780\nu inc 976 if u != 2767\nz inc -495 if ppl != -368\nz dec 481 if dea != -246\nppl dec 539 if ppl >= -381\nuz dec 213 if uz >= -2504\na inc -9 if tn < 1509\nny dec 719 if u < 3757\nuz inc 718 if hkt <= 3103\nny dec 378 if u >= 3748\nme dec 163 if xxh >= -1076\nt dec -569 if hkt > 3105\nfr inc -280 if a <= 2407\nl dec -908 if q != 527\na inc -13 if me < -1912\ndea dec 584 if mdk <= -1464\nhw inc -988 if l >= 692\ntn dec 847 if mdk < -1451\nhw inc 568 if utc > 2822\nt dec 133 if tn < 659\nz inc 271 if q <= 539\nmdk inc -33 if q <= 545\nl inc 185 if dea >= -259\nxxh inc 36 if xxh != -1064\na dec 70 if xxh >= -1042\nz inc 956 if p > 931\nutc inc -778 if dea != -244\ndea inc -868 if z > -1985\nt dec -872 if u >= 3750\nppl dec 420 if u < 3747\ndea inc 372 if xxh >= -1043\nhkt dec 32 if u != 3759\nt inc 23 if uz == -1985\nny dec 106 if ufk == -683\ndea dec -794 if t == 1441\nhkt dec -233 if t < 1435\nq dec -186 if ufk == -683\nu dec 328 if a >= 2331\nxxh inc -179 if z <= -1991\nutc inc -614 if qlm > -254\nfr dec 136 if m != 2349\nuz inc -942 if uz >= -2000\nme inc 391 if m >= 2340\nl dec -448 if utc > 2054\nme dec -64 if fr > -696\nutc dec -621 if qlm > -256\nz dec -622 if dea == 132\na dec -228 if ny == 1992\nqlm inc 957 if a <= 2563\nt dec 178 if hkt == 3304\nme dec -583 if uz >= -2940\nxxh dec 22 if ny >= 1988\nufk dec 294 if fr <= -690\nl dec 666 if a != 2559\ntn dec 135 if qlm >= 704\nhkt inc 524 if q == 722\nuz inc 448 if dea > 118\nq inc 299 if hkt >= 3832\nu dec 502 if p <= 931\nqlm dec -530 if l > 863\nm dec -677 if m > 2344\nuz inc -254 if qlm < 1236\np inc 164 if tn != 663\nny inc -208 if me >= -874\nhw inc 688 if ny >= 1775\nq dec -90 if ny < 1787\nqlm inc 602 if l <= 874\nxxh inc 442 if uz == -2739\nmdk inc 235 if xxh == -793\na dec -225 if u > 2911\nm dec -706 if hkt <= 3831\na dec 229 if ufk <= -977\nppl dec 256 if xxh == -788\nt inc 1000 if p < 1087\nhw inc -970 if a <= 2564\nhw dec 398 if ny >= 1779\nppl inc 984 if ufk != -968\nutc inc -979 if ufk != -967\nhw dec -383 if utc > 1678\np dec 283 if xxh == -793\nhw inc -434 if ny <= 1786\nu dec -226 if l == 868\nl dec 943 if tn > 675\nxxh inc -64 if p >= 807\nppl inc 577 if fr == -694\ndea inc 629 if ppl > 636\nu dec 113 if ufk != -984\na inc 482 if dea < 760\ndea dec -232 if xxh == -857\nny inc -952 if ufk < -967\nhkt inc 159 if p < 811\nz inc 530 if mdk == -1258\nm dec -745 if dea <= 988\nm inc -554 if mdk >= -1258\nfr inc -798 if xxh >= -864\nq dec -139 if utc > 1690\nm dec 962 if p < 808\na inc -409 if u <= 2809\nu dec -30 if ppl > 643\nuz dec 502 if u < 2834\nl dec -653 if qlm == 1834\nqlm inc 732 if me <= -869\ntn dec 200 if fr >= -1495\nny inc -26 if a <= 2632\nhkt inc -601 if ppl < 656\nt inc -277 if l <= 1521\na inc -86 if xxh < -847\nhkt dec -42 if qlm >= 2566\ndea dec 218 if p >= 807\nufk dec 870 if q > 815\nz inc 141 if z == -1463\nl dec 873 if mdk > -1263\nu dec 897 if ppl <= 653\ndea inc -239 if p < 809\nxxh inc 525 if uz >= -2746\ndea inc 827 if mdk > -1266\ndea dec -988 if ppl != 636\nny dec 330 if m < 3923\nq inc -413 if hw > -2554\nhw inc 983 if mdk < -1250\nmdk dec 932 if hw >= -1573\nfr inc -984 if u >= 1934\nxxh dec -344 if qlm > 2566\np dec 189 if tn != 464\nhw inc -986 if ny < 473\nm dec 233 if z > -1323\nmdk inc -803 if a >= 2542\nu dec -858 if dea > 2570\nme dec 215 if dea >= 2590\nq inc 945 if dea >= 2589\nz inc 55 if ny >= 471\nxxh dec -63 if a <= 2544\nfr dec -864 if ufk != -969\nme dec -330 if me <= -861\nufk inc -96 if dea <= 2586\nfr inc 348 if uz >= -2739\nqlm inc -249 if q <= 805\nqlm dec -752 if uz < -2736\nhkt dec -389 if q < 818\ndea inc -169 if ppl == 646\nxxh inc -689 if z <= -1268\ntn inc 911 if m <= 3697\nppl inc -390 if a != 2551\na inc 87 if ufk != -1074\nz inc 413 if ppl == 262\np inc 476 if mdk < -2052\np dec -570 if z != -1257\nuz inc 266 if hkt <= 3654\nppl inc -29 if ny <= 474\nny inc -154 if ppl <= 264\nufk inc -614 if uz < -2741\ndea dec -627 if xxh == -269\nme inc 553 if p < 1670\nq inc -413 if a > 2636\nq dec 754 if utc == 1688\np dec 857 if m == 3688\ndea dec 883 if ufk >= -1074\nuz inc -485 if l == 647\ndea dec -979 if me <= 15\nhkt dec 738 if l > 642\nxxh inc 298 if tn < 1372\nuz dec 235 if l != 651\nm dec -170 if tn > 1379\nhkt inc 902 if a > 2619\nhkt inc 354 if hw < -1573\nqlm dec 512 if uz != -3462\nu inc -676 if t != 984\na inc 635 if z == -1267\nppl inc -756 if q <= 60\nt inc 662 if mdk == -2061\nqlm dec -900 if p > 807\nz dec 877 if hkt == 4176\na dec -841 if uz > -3466\ndea inc 141 if u != 2115\nq inc 917 if dea != 3270\nppl inc -582 if tn >= 1375\ndea dec -309 if xxh < -271\nutc inc -353 if hw <= -1578\nmdk dec 643 if q != 979\nhw inc -595 if fr != -1254\nxxh inc 736 if ny != 325\nhkt inc -692 if z == -2144\np dec 500 if hw < -2170\nuz dec -168 if ppl >= -1083\nu dec 419 if hw > -2181\nfr inc -653 if u != 1704\nm inc -677 if qlm < 3716\nqlm dec -341 if u >= 1704\nme dec -926 if utc >= 1329\nqlm dec -462 if hw != -2174\nfr dec 604 if hw != -2173\np dec -826 if uz >= -3291\nhkt inc -855 if ny <= 315\nutc dec -647 if dea > 3269\nxxh inc 483 if z < -2143\nl dec 93 if utc >= 1979\ndea inc -680 if fr != -1264\nme inc -293 if ufk != -1063\nuz dec 279 if t == 1636\nxxh inc -145 if u <= 1705\nq inc 269 if a > 4097\nufk dec 734 if l >= 552\nz dec -270 if utc > 1977\ntn inc -154 if t <= 1645\nmdk inc 455 if uz < -3283\ndea inc 350 if utc < 1992\nhw dec -300 if ppl <= -1085\nufk inc 337 if u >= 1699\nppl inc -634 if l != 558\nt dec -583 if xxh == 805\nt dec 384 if dea >= 3620\np dec -873 if m == 3011\nufk inc -710 if uz < -3287\nhw inc -808 if hkt <= 3490\nhw dec -464 if u > 1702\nm dec -102 if mdk > -2256\nfr dec 579 if t > 1829\ndea dec -839 if qlm < 4519\nufk dec -741 if l <= 545\nme inc -520 if z <= -1865\nmdk dec 824 if hkt < 3493\nqlm inc -703 if q <= 1243\nt dec 284 if qlm < 4517\nfr dec -527 if ufk == -2183\nme dec -995 if xxh == 805\nutc inc 498 if hw < -2525\nhw dec -350 if ufk <= -2174\ndea inc 143 if mdk == -3073\nutc dec 812 if l < 552\nufk dec 679 if hkt <= 3490\na inc -464 if ny < 317\nufk inc 116 if hkt > 3483\nhw inc 77 if mdk < -3063\nhkt dec 851 if ny < 329\nuz dec -37 if uz != -3287\nhkt dec 45 if xxh == 805\nuz dec -682 if fr <= -1850\ndea inc 695 if hkt > 2582\np dec 857 if hkt <= 2592\nfr inc 114 if dea < 5309\nq dec -714 if p < 1158\nutc dec 896 if ufk != -2752\nuz dec -937 if ufk < -2741\np inc -807 if tn <= 1232\nufk inc 788 if fr >= -1730\nufk dec 519 if l > 558\nufk dec 142 if tn < 1227\nppl dec -561 if ufk > -2103\ndea dec 463 if fr >= -1728\nm inc 139 if tn != 1218\nfr dec -606 if q >= 1951\nqlm inc 934 if fr >= -1122\na dec -910 if xxh < 815\nhw dec -564 if a <= 5015\nu dec -648 if hw > -1532\nhkt dec 601 if hkt <= 2588\nq dec -480 if hkt < 1997\nuz dec 596 if hkt >= 1983\np dec -971 if u > 2347\nz dec 790 if m == 3252\nfr inc 281 if hw <= -1517\nuz dec 636 if hw == -1516\nl dec -582 if ny > 315\nny inc 202 if dea < 5306\nmdk inc -251 if ppl > -1147\nme dec 826 if p == 1317\nqlm dec -11 if p == 1317\nz inc -166 if a >= 5011\nny inc 455 if l >= 1127\nutc dec -156 if qlm < 4525\nq dec -147 if l <= 1129\nufk inc 36 if ny < 978\nppl dec -871 if uz < -2907\nfr inc 776 if t >= 1548\nqlm inc -510 if u != 2352\nz inc 373 if dea >= 5294\nuz dec -975 if fr <= -59\nfr dec -670 if z < -2459\nutc dec 322 if q != 2428\nl dec 3 if ppl != -282\nuz dec 728 if ny > 971\nny dec -396 if p > 1308\na inc -502 if mdk <= -3067\nny dec -492 if uz <= -2666\nppl inc -720 if t >= 1554\nuz inc -323 if hw != -1533\nppl inc 805 if m >= 3252\np inc 310 if qlm != 4520\nm dec 743 if dea >= 5299\nppl inc 847 if t <= 1546\np dec 89 if u != 2352\na inc 472 if z < -2455\nme dec 301 if utc > 914\nppl inc 740 if q < 2434\nufk inc -633 if l > 1138\nppl inc -51 if hw > -1529\nu dec -714 if fr >= -56\nz dec 510 if me >= 0\nl inc 664 if mdk != -3073\nqlm dec -742 if l < 1142\nny dec -473 if tn == 1225\nfr inc -805 if ufk > -2093\nxxh dec -151 if fr > -74\nhw inc -734 if hw <= -1528\np dec 976 if uz >= -2990\nmdk inc 523 if m == 2509\nu dec -176 if utc < 923\nme inc 766 if hkt != 1987\nppl dec -392 if mdk != -2557\nl inc -756 if u > 2527\nfr inc -990 if xxh > 955\nl inc 901 if ufk > -2100\nxxh dec -856 if ppl >= 137\nhkt dec -989 if t == 1561\np dec 846 if p > 339\nhkt inc -429 if dea != 5302\nu dec 534 if hw <= -1517\nuz dec 178 if xxh > 1803\nz dec 655 if m <= 2516\nxxh inc -340 if ny < 2334\nu inc -545 if dea != 5295\np inc -996 if uz > -3172\ndea dec -140 if hkt != 1984\nq inc -764 if a <= 4985\nz inc 263 if uz == -3167\nl dec -929 if a <= 4985\np inc -214 if uz >= -3170\nuz inc 393 if hw >= -1533\ntn inc -624 if me == -5\nme inc -474 if ufk != -2106\nppl dec 475 if l <= 2214\nqlm inc 417 if u != 1449\np inc -490 if qlm > 5257\na inc 526 if u <= 1452\nny inc -347 if u <= 1454\np dec 397 if uz < -2765\nt dec 548 if u <= 1448\nufk dec 514 if ufk > -2102\nl dec 744 if uz != -2782\nfr dec 810 if ppl == -333\nppl dec -338 if qlm > 5258\nqlm dec 272 if q > 1665\nm dec 521 if ufk >= -2614\nuz dec 558 if me < -477\np inc -632 if m >= 1987\ndea inc -237 if fr != -1864\nmdk dec 3 if utc > 917\nl inc -406 if dea >= 5213\ndea inc -268 if z == -2849\nutc inc 675 if q > 1664\nme dec -905 if p < -3230\nufk inc -799 if u != 1439\nxxh inc 718 if hkt != 1987\ntn inc 156 if qlm >= 4984\np inc -680 if fr == -1866\nppl inc 423 if hkt >= 1980\np inc -759 if ufk != -3405\nme inc 496 if qlm <= 4995\nm dec 111 if mdk != -2545\nu dec 351 if z < -2843\nuz dec -405 if xxh != 1804\nny dec -634 if utc == 1592\nqlm inc 294 if l == 1463\nxxh inc -994 if a <= 5511\na inc 460 if uz == -2927\nt inc -313 if u != 1093\nl inc 254 if hkt > 1978\ndea dec -290 if ppl <= 429\nny inc 190 if z <= -2844\nppl inc -865 if dea == 5220\nz dec 372 if utc <= 1595\nl dec -563 if u < 1104\nz inc -283 if xxh < 821\nq inc 967 if utc == 1595\nq dec -621 if ppl > 433\nl dec -221 if tn > 757\nl dec -935 if a >= 5962\nl inc -62 if l != 3225\nhkt dec -654 if t > 1240\ndea inc 87 if p == -4673\nl dec -166 if u <= 1098\ndea dec 183 if hw != -1529\nq dec 70 if p == -4667\na dec -673 if ny < 2188\nq dec 295 if mdk != -2563\nm dec -26 if a == 6644\nqlm inc 378 if xxh != 816\na dec 174 if l <= 3320\nfr inc 117 if dea >= 5131\nhkt dec -732 if hkt >= 2634\nufk inc -838 if mdk != -2547\nny inc -964 if a >= 6461\nhw dec -264 if a == 6470\nz dec -834 if ufk >= -4251\nl inc -658 if m > 1897\nxxh inc 400 if fr >= -1753\nhw dec 380 if hw <= -1265\nt inc -608 if utc < 1597\nppl dec 352 if a > 6467\nl dec -355 if utc > 1591\nl dec 846 if dea <= 5128\nppl dec 756 if fr < -1746\nutc dec 259 if p == -4673\ntn dec 160 if hw < -1257\nt inc -625 if t != 640\nxxh dec 804 if dea > 5130\nny dec 227 if z <= -2665\nppl dec 306 if uz != -2922\nq dec -671 if hw < -1262\ntn dec 149 if ufk == -4248\np dec -583 if mdk == -2553\nhw inc 312 if uz <= -2919\nhkt inc 111 if tn >= 456\nq dec -23 if uz > -2918\nhw inc -291 if l > 3008\nme inc -744 if utc > 1327\nuz dec 188 if utc >= 1336\nhw dec -575 if z < -2663\nppl dec 977 if ny != 988\nl dec -84 if dea < 5135\np inc 905 if uz == -3115\nm inc 636 if m == 1903\nhkt dec 95 if p < -3178\nu inc 249 if utc > 1331\nuz dec -196 if qlm == 5662\nhkt inc -621 if fr > -1750\nz inc -859 if l < 3093\nl inc -789 if ppl > -1957\nme inc 916 if tn >= 457\nuz dec -115 if xxh != 406\nz dec -353 if z <= -2669\nhw inc -965 if ppl != -1960\nt inc 333 if qlm == 5662\nt dec 860 if z == -2310\np dec -841 if l > 3104\nqlm inc 225 if t == 341\nutc inc -937 if p <= -3185\nqlm inc -191 if xxh < 424\nm dec 607 if q != 2354\nuz inc 807 if p >= -3178\nfr dec -431 if uz == -2804\nppl dec -312 if t <= 341\na dec -764 if mdk >= -2557\nutc dec 505 if a >= 7228\nufk dec -148 if tn != 449\nutc dec -371 if utc != -100\ndea dec -11 if utc < 272\nufk inc 329 if utc != 261\nutc dec -484 if z <= -2312\nm dec 784 if ppl == -1651\nxxh dec 669 if m <= 1147\nxxh inc -798 if me == 178\np dec -832 if ppl == -1651\nufk inc 266 if fr > -1318\na inc -993 if fr >= -1319\nxxh inc 25 if ppl != -1652\nu inc -353 if hw == -1631\np inc -338 if q >= 2340\np dec 517 if utc >= 741\nppl dec -221 if dea > 5137\nhw dec 949 if mdk < -2544\ntn inc 201 if ufk != -3781\nmdk inc 855 if t > 334\nm dec 604 if q <= 2353\nme inc 268 if tn <= 644\ntn inc -372 if m > 540\nl dec 275 if qlm >= 5687\nmdk dec -13 if p == -3199\nz dec -725 if tn > 286\ndea inc -843 if dea == 5142\nhw inc -603 if a >= 6234\nppl inc 850 if tn <= 279\nl inc -601 if uz == -2804\nm inc 10 if z >= -2319\nfr inc -412 if xxh != -351\nme dec 726 if tn >= 277\nny dec -719 if me < -544\nhw dec 413 if q > 2349\na dec -229 if hkt == 2651\nt inc 620 if t != 347\nuz inc -216 if t <= 963\nfr inc 614 if me != -549\nxxh inc 536 if z < -2309\nq inc 974 if me < -548\nq inc -131 if ny == 1711\ntn dec 110 if tn > 274\nl inc 47 if p == -3208\nxxh inc -872 if dea >= 4295\ntn inc -667 if tn <= 169\nq dec 562 if mdk >= -1700\na inc -16 if xxh != -685\nhw dec 649 if xxh == -695\nufk inc 239 if l != 2268\nt dec 935 if ppl <= -576\nm dec 1000 if fr > -1120\nhkt inc -167 if xxh == -695\nny inc 926 if uz > -3027\nm inc -729 if xxh > -693\nm inc -677 if a > 6221\np dec -412 if qlm >= 5691\nm dec -678 if ufk < -3526\nppl inc 206 if z < -2308\nm inc -961 if m != -445\nt inc -989 if mdk > -1701\nppl dec 43 if q <= 1654\nxxh inc -619 if ny == 2637\nppl dec 168 if xxh < -1312\nt inc 191 if xxh > -1320\nme inc 387 if hw >= -3826\np inc 517 if q <= 1648\nq dec 577 if ppl > -589\nu dec -841 if fr <= -1115\ndea dec -791 if p <= -2793\nhkt inc 216 if tn != -500\nuz dec -333 if hkt >= 2490\ndea inc 46 if a > 6217\nmdk inc -168 if fr > -1117\nt inc -606 if fr > -1122\nme inc 662 if hkt != 2491\nuz dec 384 if p > -2806\nuz inc -848 if xxh < -1308\nny inc 617 if tn < -497\nfr dec -359 if utc != 750\nm dec -911 if ufk <= -3530\nppl dec -190 if mdk != -1858\nu dec -400 if t > -1388\nme inc -381 if u == 2235\nhw inc -548 if m == 466\nqlm inc -940 if mdk <= -1860\ndea dec 180 if z <= -2316\nhw inc 17 if tn != -504\nfr dec -769 if me > -277\nppl inc -630 if hkt == 2482\nhw inc 825 if xxh == -1314\nutc dec -38 if hw < -3529\nq dec 851 if uz <= -3918\nme dec -417 if me > -274\nq inc 505 if ny < 3248\nny dec 299 if fr > 9\nutc dec 996 if z == -2317\nz inc 157 if ppl == -395\nmdk inc -11 if mdk == -1866\nt dec -222 if ny <= 2964\nq dec 1000 if u <= 2244\ntn dec -704 if ppl >= -399\nl inc 666 if utc > -212\nq inc 890 if dea >= 4951\ntn inc 255 if xxh > -1324\nme dec -317 if p == -2796\nutc dec 651 if m >= 460\ndea dec -945 if q > 110\nny inc -755 if z > -2169\na inc 1 if utc < -858\nuz dec 840 if utc >= -861\nl dec 131 if ufk != -3542\nhkt inc -442 if u > 2236\nmdk dec -156 if hw == -3531\nufk dec 380 if uz != -4756\nxxh dec 198 if p == -2796\nfr inc -946 if z != -2165\nq dec -736 if dea < 5898\nqlm inc -284 if fr == -934\nz dec 895 if t < -1152\nme dec -370 if l != 2806\na dec -949 if dea >= 5906\nl inc -913 if uz <= -4758\nuz inc 15 if t > -1158\nm inc 535 if xxh > -1516\nme inc -896 if u > 2228\nm inc -821 if fr == -934\nme dec 754 if m <= 189\nxxh inc 685 if p >= -2802\nutc inc 149 if uz == -4744\nufk dec -486 if hw <= -3535\ntn dec 617 if u != 2228\nfr inc -971 if ny < 2191\nl dec 933 if z < -3053\nq dec 269 if qlm > 4467\nme inc 449 if l < 968\nutc inc -359 if l <= 965\ntn inc -465 if p <= -2798\nxxh dec -811 if t <= -1149\nfr dec -106 if m <= 182\nuz inc 603 if p < -2794\nuz inc 310 if z <= -3064\nny inc -764 if hw >= -3538\nmdk dec -843 if ufk < -3416\na inc 49 if tn != -158\ndea inc 129 if ufk >= -3433\nny dec 515 if ny < 1438\nq inc -603 if ufk < -3419\ntn dec 470 if hkt < 2496\nm inc -669 if utc <= -1067\ndea inc 401 if ny >= 912\np inc 129 if tn >= -631\np dec -708 if hw != -3540\ndea inc 932 if mdk == -1024\ntn dec -244 if ufk == -3426\nny dec 632 if utc >= -1075\nny dec -958 if z > -3063\nme dec -67 if hkt == 2490\nfr inc 431 if mdk > -1038\nny dec -435 if z < -3052\nny inc 997 if ny != 1686\ndea inc 397 if hw < -3537\nhw dec 232 if xxh == -16\nq inc 826 if p > -1960\nq inc -807 if z < -3045\nuz dec -645 if a < 6227\nme inc -725 if qlm < 4477\nxxh dec -440 if z == -3055\nmdk inc 647 if m <= -489\nt dec -497 if dea != 6827\nhkt dec -874 if hkt == 2490"
];
//# sourceMappingURL=Day08.js.map