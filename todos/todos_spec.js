describe('Todo', function () {
  var todo;

  beforeEach(function () {
    todo = new Todos.Todo();
  });

  describe('#toggle', function () {
    it('はdone属性を反転させてsaveする', function () {
      spy = spyOn(todo, 'save')

      todo.set('done', false)
      todo.toggle();
      expect(spy).toHaveBeenCalledWith({done: true});

      todo.set('done', true)
      todo.toggle();
      expect(spy).toHaveBeenCalledWith({done: false});
    });
  });
});

describe('TodoList', function () {
  var todolist;

  beforeEach(function () {
    todolist = new Todos.TodoList();
  });

  it('はTodoのCollection', function () {
    expect(todolist.model).toBe(Todos.Todo);
  });

  describe('#add', function () {
    it('は追加されるmodelにorder属性を付与する', function () {
      var todo = new Todos.Todo();
      expect(todo.get('order')).toBeUndefined();
      todolist.add(todo);
      expect(todo.get('order')).toBeDefined();
    });
  });

  describe('#done', function () {
    it('は完了しているtodoの配列を返す', function () {
      var done = new Todos.Todo({done: true}),
          notyet = new Todos.Todo({done: false});
      todolist.reset([done, notyet]);
      expect(todolist.done()).toEqual([done]);
    });
  });

  describe('#remaining', function () {
    it('は完了していないtodoの配列を返す', function () {
      var done = new Todos.Todo({done: true}),
          notyet = new Todos.Todo({done: false});
      todolist.reset([done, notyet]);
      expect(todolist.remaining()).toEqual([notyet]);
    });
  });

  describe('#nextOrder', function () {
    describe('Collectionが空の場合', function () {
      it('は1を返す', function () {
        expect(todolist.nextOrder()).toBe(1);        
      });
    });

    describe('CollectionにModelが含まれる場合', function () {
      var order;

      beforeEach(function () {
        todolist.add({});
        var todo = todolist.last();
        todo.set('order', order = 10);
      });

      it('は最後のmodelのorder属性+1の値を返す', function () {
        expect(todolist.nextOrder()).toBe(order + 1);
      });
    });
  });
});
