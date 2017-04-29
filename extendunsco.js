/*
 * underscore js 拡張処理
 * http://niku9.click
 * Released under the MIT license
 * version 0.1.1
 * (C) T_J 2016 
 */
(function(){

	// ファンクション名称
	var FNC_NAME = "extendunsco";
	// バージョン
	var VERSION = "0.0.2"

	// create object
	var root = this;

	var _fnc = {};

	// Underscore.jsが生成されていない場合
	if (!_) {
		return null;
	};

	/**
	 * 一定回数のループを実行
	 * @param max 最大回数
	 * @param min 最小値 null = 0;
	 * @param step up 増加方法 null = ++1
	 * @param executer function 関数 
	 * @return [object] executerの結果配列
     * @author  tomohiro.jin
	 **/
	_fnc.fixedNumber = _.isUndefined(_.fixedNumber) ? function() {

		var min_ = 0, max_ = 0, setpUp_ = function(index){return 1 + index; }, fnc_ = null;

		// 引数の一つ目が数字、関数の場合
		if (arguments.length < 2) {
			return [];
		} else if ( arguments.length == 2  && _.isNumber(arguments[0]) && _.isFunction(arguments[1])){
			max_ = arguments[0];
			fnc_ = arguments[1];
		} else if (arguments.length == 3 && _.isNumber(arguments[0]) && _.isNumber(arguments[1]) && _.isFunction(arguments[2])) {
			min_ = arguments[0];
			max_ = arguments[1];
			fnc_ = arguments[2];
		} else if (arguments.length == 3 && _.isNumber(arguments[0]) && _.isFunction(arguments[1]) && _.isFunction(arguments[2])) {
			max_ = arguments[0];
			setpUp_ = arguments[1];
			fnc_ = arguments[2];
		} else if (arguments.length == 4 && _.isNumber(arguments[0]) && _.isNumber(arguments[1]) && _.isFunction(arguments[2]) && _.isFunction(arguments[3])) {
			min_ = arguments[0];
			max_ = arguments[1];
			setpUp_ = arguments[2];
			fnc_ = arguments[3];
		} else {
			return null;
		}
		var retAry = [];
		for (var i = min_; max_ > i; i = setpUp_(i)) {
			retAry.push(fnc_(i));
		}
		return retAry;
	} : _.fixedNumber;

    /**
     * DeepCopy
     * @param oldObjct deep clonするObject
     * @return [object] コピーされたObject
     * @author  tomohiro.jin
     * TODO 循環参照が解決できてない。
     */
    _fnc.cloneDeep = _.isUndefined(_.cloneDeep) ?  function(){
        var oldObject = null;
        
        if (arguments.length < 1) {
            return undefined;
        } else  if (_.isFunction(arguments[0])) {
        	return arguments[0];
        } else  if (_.isDate(arguments[0])) {
        	return new Date(arguments[0]);
        } else  if (_.isRegExp(arguments[0])) {
        	return new RegExp(arguments[0]);
        } else  if (_.isObject(arguments[0])) {
            oldObject = arguments[0];
        } else {
            return arguments[0];
        };
        
        return (_.isArray(oldObject)  ?  _.map : _.mapObject)(oldObject, function(obj, index, context){
            return _fnc.cloneDeep(obj);
        });
        
        
        
    } : _.cloneDeep;
    
	// 拡張処理
	_.extend(_, _fnc);

}).call(this)
