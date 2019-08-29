const InvalidAcceException = use('App/Exceptions/InvalidAcceException');
const RosourceNotExistException = use('App/Exceptions/RosourceNotExistException');

class AuthorizationService {
  verifyPermision(resourse,user){
    if(!resourse){
      throw new RosourceNotExistException();
    }
    if(resourse.user_id!==user.id){
      throw new InvalidAcceException();
    }
  }
}

module.exports = new AuthorizationService();
