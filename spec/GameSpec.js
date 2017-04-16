describe('Game', function() {

  var game;
  beforeEach(function() {
    game = new Game();
  });

  it('is initiated without any frames', function() {
    expect(game._frames).toEqual([]);
  });

  it('stores finished frames', function(){
    spyOn(game._currentFrame, 'isFinished').and.returnValue(true)
    game.roll()
    game._storeFrame()
    expect(game._frames.length).toEqual(1)
  });

  it('calculates total points', function(){
    spyOn(game._currentFrame, '_hit').and.returnValue(4)
    game.roll()
    game.roll()
    game._storeFrame()
    expect(game.total()).toEqual(8)
  });

  it('adds bonus points for a spare', function() {
    spyOn(game._currentFrame, '_hit').and.returnValue(5)
    game.roll()
    game.roll()
    game._storeFrame()
    spyOn(game._currentFrame, '_hit').and.returnValue(4)
    game.roll()
    game.roll()
    game._storeFrame()
    expect(game.total()).toEqual(22)
  });

  it('adds bonus points for a strike', function() {
    spyOn(game._currentFrame, '_hit').and.returnValue(10)
    game.roll()
    game._storeFrame()
    spyOn(game._currentFrame, '_hit').and.returnValue(4)
    game.roll()
    game.roll()
    game._storeFrame()
    expect(game.total()).toEqual(26)
  });

  it('adds correct bonus points if two strikes in a row', function() {
    spyOn(game._currentFrame, '_hit').and.returnValue(10)
    game.roll()
    game._storeFrame()
    spyOn(game._currentFrame, '_hit').and.returnValue(10)
    game.roll()
    game._storeFrame()
    spyOn(game._currentFrame, '_hit').and.returnValue(7)
    game.roll()
    game.roll()
    game._storeFrame()
    expect(game.total()).toEqual(65)
  });

  it('reports that the game is over', function() {
    for(var x = 0; x<9; x++) {
      spyOn(game._currentFrame, '_hit').and.returnValue(4)
      game.roll()
      game.roll()
      game._storeFrame()
    }
      expect(game.isFinalFrame()).toBeTruthy()
  });


});
