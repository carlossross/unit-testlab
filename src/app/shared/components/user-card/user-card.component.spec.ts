import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent (dumb)', () => {
  it('renderiza fullName y email', () => {
    TestBed.configureTestingModule({
      imports: [UserCardComponent],
    });

    const fixture = TestBed.createComponent(UserCardComponent);

    // fixture.componentInstance.user = {
    //   id: 1,
    //   fullName: 'Ada Lovelace',
    //   email: 'ada@dev.com',
    // };

    fixture.componentRef.setInput('user', {
      id: 1,
      fullName: 'Ada Lovelace',
      email: 'ada@dev.com',
    });

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Ada Lovelace');
    expect(el.textContent).toContain('ada@dev.com');
  });

  it('emite select con el user al click', () => {
    TestBed.configureTestingModule({
      imports: [UserCardComponent],
    });

    const fixture = TestBed.createComponent(UserCardComponent);

    const user = {
      id: 2,
      fullName: 'Alan Turing',
      email: 'alan@dev.com',
    };

    // fixture.componentInstance.user = user;
    fixture.componentRef.setInput('user', user);

    let emitted: any = null;
    fixture.componentInstance.select.subscribe((v) => (emitted = v));

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');

    expect(emitted).toEqual(user);
  });

  it('renderiza fullName y email (setInput moderno)', () => {
    TestBed.configureTestingModule({
      imports: [UserCardComponent],
    });

    const fixture = TestBed.createComponent(UserCardComponent);

    fixture.componentRef.setInput('user', {
      id: 1,
      fullName: 'Ada Lovelace',
      email: 'ada@dev.com',
    });

    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Ada Lovelace');
    expect(el.textContent).toContain('ada@dev.com');
  });
});
