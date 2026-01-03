export namespace main {
	
	export class AddBaseDirResult {
	    success: boolean;
	    alreadyExists: boolean;
	
	    static createFrom(source: any = {}) {
	        return new AddBaseDirResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	        this.alreadyExists = source["alreadyExists"];
	    }
	}
	export class RemoveBaseDirResult {
	    success: boolean;
	
	    static createFrom(source: any = {}) {
	        return new RemoveBaseDirResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	    }
	}

}

