
## Intro

Aplikacja do zarzadania zamówieniami z programu Insert. 
Przekazanie zamówień na produkcję i obliczanie prowizji handlowca.

### Dashboard

Aplikacja bazuje na zamówieniach od klienta wprowadzonych w programie Gestor/Subiekt firmy Insert.
Pobiera zamówienia z MSSQL i wczytuje do aplikacji w sekcji Dashboard

Każdy handlowiec posiada swój login i widok ze swoimi zamówieniami.

Po wczytaniu danych, zamówienia zostaną wyświetlone w zakładce nowe

Każde zamówienie posiada 
- niezbędne dane do dalszego procesu obróbki 
- możliwość zlecenia produkcyjnego (TPD, FS)
- mozliwość nadania priorytetu produkcyjnego i terminu
- możliwość zlecenia wysyłki dla pakowacza
- dodanie poziomu marży przy sprzedaży

Po wykonianiu działania produkcja/wysyłka zamówienie zmieni status i będzie widoczne w zakładce Zlecone/Wysyłka

### Widok Produkcja

Pracownicy produkcyjni i magazynowi będą posiadać swój dostęp z widokiem na zamówienia zlecone TPD, zlecone FS i wysyłkowe.
Zamówienia będą mieć :
- możliwość potwierdzenia terminu realizacji
- możliwość potwierdzenia zrealizowani zamówienia
- możliwość przesunięcia do wysyłki
- filtrowanie po terminach realizacji


### Widok Prowizje (Handlowiec)

Handlowiec ma obiliczaną prowicje na podstawie zamówień i ustalonych pozimów marży. 
Wypłata marży powiązana jest z ustawionym targetem. 
Wyliczenie prowizji na m-c i kwartał.

### Widok Administracja

Dostęp dla kadry zarządzającej, widok wszystkich zamówień. Widok raportów sprzedaży m-c, kwartał, rok.

### Przykładowy scenariusz

1. Logowanie handlowca i wejście w widok nowe zamówienia
2. Ustawienie poziomu prowizji
3. Zlecenie produkcyjne na TPD i ustawienie priorytetu 8dni.
4. Produkcja potwierdza termin za 8 dni.
5. Produkcja zaznacza zrealizowanie zlecenia i gotowe do wysyłki.
6. Pakowacz w zakładce wysyłka widzi zlecenie do spakowania
7. Po wysłaniu zmienia status na wysłane.