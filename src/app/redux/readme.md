usage sample:


constructor(private store: Store) {}

public observable$?: Observable<IBoardState[]>;

onClick(){
this.store.dispatch(addBoardAction({ observable$ }));
}

public ngOnInit() {
this.observable$ = this.store.select(selectBoards);
}
}
