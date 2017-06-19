/*
 * niku9.click ソート処理
 * http://niku9.click
 * Released under the MIT license
 * version 0.1.0
 * (C) T_J 2016 
 */
(function(option){
    
   	    // ファンクション名称
	var FNC_NAME = "niku9Sort",
        // バージョン
        VERSION = "0.0.9",
        // create object
        root = this,
        // Base
        fnc_ = {},
        // BaseOption
        option_ = {
            // 変更配列
            arrays: [],
            // 比較処理
            compare: defaultCompare    
        };
    
    /*
     * ソート処理
     * ソートについて説明を記述
     * <pre>
     * stable sort（安定ソート） … ソート後も順序が同じソートアルゴリズム 
     * in-place sort（内部ソート）… 格納領域としてO(1),O(log n)
     * out-of-place sort（外部ソート）…格納領域としてO(n)以上の記憶領域
     * 比較ソート 比較演算による大小ソート
     * </pre>
     */

	/**
	 * バブルソート
	 */ 
	fnc_.bubble = function(arrays, compare) {
		
		if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
		
		for (var i = 0; i < option_.arrays.length - 1; i++) {
			for(var j = i + 1; j < option_.arrays.length; j++){
				if (option_.compare(option_.arrays[i], option_.arrays[j])){
					swap(option_.arrays , i, j);
				}
			}
		}
        
        return option_.arrays;
        
	};
	
	// シェーカーソート
	fnc_.shaker = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		};
        
        var topIndex = 0,
              lastIndex = option_.arrays.length - 1,
              swapIndex = 0;
        
        // ループ
        while(true){
            for (var i = topIndex  ; i < lastIndex; i++ ) {
                if(option_.compare(option_.arrays[i], option_.arrays[i + 1])){
                    swap(option_.arrays , i, i + 1);
                    swapIndex =  i;
                }
            }
            lastIndex = swapIndex;

            if (topIndex ==lastIndex)  break;
            
            for (var j =  lastIndex; j > topIndex ; j--) {
                if(!option_.compare(option_.arrays[j], option_.arrays[j - 1])){
                    swap(option_.arrays , j, j - 1);
                    swapIndex =  j;
                }
            }
            topIndex = swapIndex;
            if (topIndex == lastIndex)  break;

        }
        
        return option_.arrays;
        
	};
    
	// コムソート
	fnc_.comb = function(arrays, compare) {
		if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}

        var splitIndex = Math.floor(option_.arrays.length * 10 / 13);

        while (true) {
            var stopFlg = true;
            for(var i = 0; i + splitIndex < option_.arrays.length; i++){
                if(option_.compare(option_.arrays[i], option_.arrays[i + splitIndex])){
                    swap(option_.arrays , i, i + splitIndex);
                    stopFlg  = false;
                }
            }
            
            if (splitIndex == 1 && stopFlg ) {
                break;
            } else if (splitIndex > 1)  {
                splitIndex = Math.floor(splitIndex * 10 / 13);
            }
            
        }
        
        return option_.arrays;
        
	};
    
	// ノームソート
	fnc_.gnome = function(arrays, compare) {
		if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}

        var i = 1;
        while( i < option_.arrays.length ){
            if (!option_.compare(option_.arrays[i - 1], option_.arrays[i ])){
                i++;
            } else {
                swap(option_.arrays , i - 1,  i);
                i = i == 1 ? 1 : i - 1;
            }
        };
        
        return option_.arrays;
        
	};
    
    // 選択ソート
    fnc_.select = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
        
        for ( var i = 0; i < option_.arrays.length - 1;  i++ ) {
            var min = i;
            for( var j = i + 1; j < option_.arrays.length; j++ ){
                if (option_.compare(option_.arrays[min], option_.arrays[j])) {
                    min = j;
                }
            }
            
            if (min != i) {
                swap(option_.arrays , i, min);
            }
            
        }
        
        return option_.arrays;
        
    };
    
    // 挿入ソース（インサーション）
    fnc_.insertion = function(arrays, compare){
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}

        for (var i = 1; i  < option_.arrays.length; i++) {
            var tmp = option_.arrays[i],
                 j = i;
            if (option_.compare(option_.arrays[i - 1], tmp)) {
                do {
                    option_.arrays[j] = option_.arrays[j - 1];
                    j--;
                } while(j > 0 && option_.compare(option_.arrays[j - 1], tmp));
                option_.arrays[j] = tmp;
            }
            
        }
         
        return option_.arrays;
        
    };
    
    // シェルソート
    fnc_.shell = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
        
        // 間隔の決定
        for (var interval = 0; Math.floor(option_.arrays.length / 9) >= shellInterval(interval); interval++);
        
        while (interval > 0) {
            var counter = shellInterval(interval);
            for (var i = counter; i < option_.arrays.length; i = i + counter) {
                var tmp = option_.arrays[i],
                    j = i;
                if (option_.compare(option_.arrays[i - counter ], tmp)) {
                    do {
                        option_.arrays[j] = option_.arrays[j - counter];
                        j = j - counter;
                    } while(j > 0 && option_.compare(option_.arrays[j - counter], tmp));
                    option_.arrays[j] = tmp;
                }
            }
            
            interval--;
        }
        
        return option_.arrays;
        
    };
    
    // 図書館ソート
    fnc_.library = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
        
        
    };
    
    // マージソート
    fnc_.merge = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
        
        function halfLength(ary){
            return Math.floor(ary / 2);
        };
        
        function merge_ (ary1, ary2){
            
            var ary1_ = ary1;
            if (ary1.length > 1) {
                ary1_  = merge_(ary1.slice(0, halfLength(ary1.length)), 
                      ary1.slice(halfLength(ary1.length), ary1.length));
            }
                
            var ary2_ = ary2;
            if (ary2.length > 1) {
                ary2_  = merge_(ary2.slice(0, halfLength(ary2.length)), 
                      ary2.slice(halfLength(ary2.length), ary2.length));
            }
            
            var ret = [], counter1 = 0, counter2 = 0;
            
           do{
               if (ary2_.length <= counter2 || option_.compare(ary2_[counter2], ary1_[counter1] ) ){
                   ret.push(ary1_[counter1]);
                   counter1++;
               } else {
                   ret.push(ary2_[counter2]);
                   counter2++;
               }
               
           }while(ary1_.length > counter1 || ary2_.length > counter2);
            
            return ret;
                
        };
        
        
        // 内容が複数ない場合はそのまま返却
        return option_.arrays.length > 1 ?        
        merge_ (option_.arrays.slice(0, halfLength(option_.arrays.length)) ,
           option_.arrays.slice(halfLength(option_.arrays.length), option_.arrays.length) )
        :  option_.arrays;
        
        
    };
    
    // ヒープソート
    fnc_.heap = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
 
        var heapObj = function() {
            
            var heapList = [];
            
            this.push = function(obj){

                function heapChange(childIndex){
                    var parentIndex = Math.floor(childIndex / 2);
                    if (childIndex > 0 && option_.compare(heapList[parentIndex], heapList[childIndex])  ) {
                        swap(heapList, parentIndex, childIndex);
                        heapChange(parentIndex);
                    }
                };
                
                heapList.push(obj);
                heapChange(heapList.length - 1);
            };
            
            this.shift = function() {

                function heapChange(parentIndex){

                    var child1Index = 2 * parentIndex + 1
                        , child2Index = 2 * parentIndex + 2;

                    if (child1Index < heapList.length && option_.compare(heapList[parentIndex], heapList[child1Index])  ) {
                        swap(heapList, parentIndex, child1Index);
                        heapChange(child1Index);
                    }
                    
                    if (child2Index < heapList.length && option_.compare(heapList[parentIndex], heapList[child2Index])  ) {
                        swap(heapList, parentIndex, child2Index);
                        heapChange(child2Index);
                    }
                    
                };
                
                var ret  = null;
                
                if (heapList.length > 0) {
                    swap(heapList, 0, heapList.length - 1);
                    ret  = heapList.pop();
                    heapChange(0);
                }
                return ret;

            };
            
        };
        
        var heap1 = new heapObj();

        each(option_.arrays, function(obj){
            heap1.push(obj);
        });
        
        option_.arrays = [] ;
        
        while (true) {
            var first = heap1.shift();
            if (first  == null) {
                break;
            }
            option_.arrays.push(first);
        };
        
        return option_.arrays;
        
    };
    
    // クイックソート
    fnc_.quick = function(arrays, compare) {
    
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
        
        // 1件以下の場合はそのまま返却
        if (option_.arrays && option_.arrays.length < 1) return option_.arrays;
        
        // ピボットの算出処理
        function pivot (ary, left, right) {
            return ary[Math.floor(left + right) / 2];
        };
        
        (function sort(ary, left, right) {
            if (left < right) {
                var pivot_ = pivot(ary, left, right);
                
                for (var i = left + 1; i <= right; i++ ) {
                    if (option_.compare(ary[i], ary[pivot_])) {
                        swap(ary, i, pivot_);
                    }
                }
                
                
            }
        })(option_.arrays, 0, option_.arrays .length- 1);
    };
    
    // イントロソート
    fnc_.intro = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
        
    };
    
    // シェアソート
    fnc_.shear = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
        
    };
    
    // 奇偶転置ソート
    fnc_.oddEven = function(arrays, compare) {
        
        if (baseCheck(arrays, compare)) {
			return errors("not arguments");
		}
        
    };
    
    /**
     * Swap
     */
    function swap(ary, i, j){
        var tmp = ary[i];
        ary[i] = ary[j];
        ary[j] = tmp;
    };
    
	/**
	 * 基本チェック
	 */
	function baseCheck(arrays, compare) {
		
		extend(option_, 
			{arrays: arrays, compare: compare ? compare: defaultCompare});
		
		return option_.arrays 
		  && option_.arrays.length < 1 
		  && typeof option_.compare == 'function';
		
	};
	
	/**
	 * 共通処理
	 */
	function each(obj, callback, thisArg){
		if (!obj || typeof obj != 'object' || obj.length < 1 ) return obj;
		
		if (Array.prototype.forEach) {
			obj.forEach(callback, thisArg);
		} else {
			for(var i = 0; i < ary.length; i++){
				callback.call(thisArg, ary[i], i);
			}
		};
	};

    /**
     * 数列算出
     */
    // フィボナッチ数列(Fibonacci sequence)
    /**
     * num 数目の結果を返す
     */
    function fibonacciSeq( num ) {
        
        return (function inFnc_ (counter, val1, val2){
            return counter >= num ? val1 : inFnc_(++counter,  val2,  val1 + val2);
        })(0, 0, 1);
        
    }
    // シェルソートの漸化式（ hn+1 = 3*hn+1 ）
    function shellInterval( num ) {
        
        return (function inFnc_ (counter, val){
            return counter >= num ? val : inFnc_(++counter,  3 * val + 1);
        })(0, 0);
    };
	
    /**
	 * 引数チェック
	 */
	function argsChack (arg) {
		return extend(
			option_, arg);
	};

	/**
	 * 継承処理
	 */
	function extend(oldObj, newObj){
		for(var prop in newObj) {
            oldObj[prop] = newObj[prop];
		}
        return oldObj;
	};

	/**
	 * 基本比較内容
	 * TRUE : oldVal < newVal
     * @params
	 */
	function defaultCompare(oldVal, newVal){
		return oldVal > newVal;
	};

	/**
	 * エラー処理
	 */
	function error(msg) {
		
		if (console && console.log) {
			console.log(msg);
		}
		
		alert(msg);
		
	};
	
	// CommonJs
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = fnc_;
		}
		exports[FNC_NAME] = fnc_;
	} else {
		root[FNC_NAME] = fnc_;
	}
	
	// AMD 
	if (typeof define === 'function' && define.amd) {
		define(FNC_NAME, [], function(){
			return fnc_;
		});
	}

}).call(this);
