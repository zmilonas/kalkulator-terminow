const polish: Record<string, string> = {
   'Start date': 'Data rozpoczęcia',
   'Duration': 'Długość',
   'Result': 'Rezultat',
   'Limitation calculator': 'Kalkulator terminów'
};

export function t(s: string): string
{
   return polish[s] || s;
}