class Utils {
    static time(timedata) {
        let time=new Date(timedata).getTime(); 
        var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
        return date.toJSON().substr(0, 16).replace('T', ' ');
    }
   
}
export { Utils as default };