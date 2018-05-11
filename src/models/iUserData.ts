import { Injectable, Component } from "@angular/core";
import { Api } from "../providers";
import { get_team_info_api } from "../pages";

export interface UserData {
    GLBID: string;
    teamInfo: {};
}

export interface IUserDataControll {
    loadUserData();
    getUserData();
    setGLBID(GLBID: string);
    getGLBID():string;
    setTeamInfo(teamInfo: {});
    getTeamInfo(): {};
}

@Injectable()
@Component({
    providers: [Api]
})
export class UserDataControll implements IUserDataControll {
    private userData: UserData;

    constructor(public api: Api) { };

    setGLBID(GLBID: string) {
        this.userData.GLBID = GLBID;
    };

    getGLBID(){
        return this.userData.GLBID;
    }

    setTeamInfo(teamInfo: {}) {

    }

    getTeamInfo() {
        return {};
    };

    loadUserData() {
        if (Object.keys(this.userData.teamInfo).length === 0 && this.userData.teamInfo.constructor === Object) {
            // return this.api.getWithAuth(get_team_info_api, { GLBID: this.userData.GLBID });             
            return new Promise((resolve, reject) => {
                this.api.getWithAuth(get_team_info_api, { GLBID: this.userData.GLBID })
                    .toPromise()
                    .then(
                        res => {
                            this.setTeamInfo(res.json().time);
                            resolve(true);
                        }
                    );
            });
        }
    }

    getUserData(): UserData {
        return this.userData;
    }

}

@Injectable()
@Component({
    providers: [Api]
})
export class UserDataControllFake implements IUserDataControll {
    private userData: UserData = {
        GLBID: '',
        teamInfo: {}
    };

    constructor(public api: Api) {
        this.userData.GLBID = '1021a3e0d4ecd085008493615c9b2872b7a664e655f4f56617351794f6b4239574e3357585878382d524e4f6c51795479624e7662576a756950586e616d31385545737270497256454738335476794b415a647a4579703566494162435238477a702d663150773d3d3a303a6d6175726963696f5f6a756e696f725f323031355f32';
    };

    setGLBID(GLBID: string) {
        this.userData.GLBID = GLBID;
    };

    getGLBID() {
        return this.userData.GLBID;
    }

    setTeamInfo(teamInfo: {}) {
        this.userData.teamInfo = teamInfo;
    }

    getTeamInfo() {
        return this.userData.teamInfo;
    };

    loadUserData() {
        if (Object.keys(this.userData.teamInfo).length === 0 && this.userData.teamInfo.constructor === Object) {
            // return this.api.getWithAuth(get_team_info_api, { GLBID: this.userData.GLBID });             
            return new Promise((resolve, reject) => {
                this.api.getWithAuth(get_team_info_api, { GLBID: this.userData.GLBID })
                    .toPromise()
                    .then(
                        res => {
                            this.setTeamInfo(res.json().time);
                            resolve(true);
                        }
                    );
            });
        }
    }

    getUserData(): UserData {
        return this.userData;
    }

}