export class JwtUtil {
  private ROLE_AGENCY: string = "ROLE_AGENCY";

  public decode = (token: string): any => {
    try {
      let payloadJson;
      let payload;
      const [headerB64, payloadB64, signatureB64] = (token || "").split(".");
      if (typeof atob !== undefined && payloadB64) {
        payloadJson = atob(payloadB64);
      }
      if (payloadJson !== undefined) {
        payload = JSON.parse(payloadJson);
      }
      return payload;
    } catch (e) {
      return undefined;
    }
  };

  public isExpiredToken = (token: string): boolean => {
    // 만료 5분전부터 만료로 취급
    const EXP_INTERVAL = 60 * 5;
    const payload = this.decode(token);
    const expiredTime = payload?.exp;
    const now = Math.floor(Date.now() / 1000);
    return now > expiredTime - EXP_INTERVAL;
  };

  // 대행사 판별 > 대행사가 아니면 impersonate 하지 않음
  public hasAgencyRole = (token: string): boolean => {
    const payload = this.decode(token);
    const roles: string[] = payload?.role || [];
    return roles.includes(this.ROLE_AGENCY);
  };

  // 가장된 토큰 판별 > 모먼트 이탈시 revoke 처리
  public isImpersonatedToken = (token: string): boolean => {
    const payload = this.decode(token);
    const actAs = payload?.act_as;
    return actAs != undefined;
  };
}
