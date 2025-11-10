export interface MapFilterItem {
  value: string;
  label: string;
}

export interface MapFilter {
  title: string;
  items: MapFilterItem[];
}

export const countyFilter: MapFilter[] = [
  {
    title: "Georgia",
    items: [
      { value: "All Subscribed", label: "All Subscribed" },
      { value: "Adams", label: "Adams" },
      { value: "Appling", label: "Appling" },
      { value: "Atkinson", label: "Atkinson" },
      { value: "Baldwin", label: "Baldwin" },
      { value: "Banks", label: "Banks" },
      { value: "Barrow", label: "Barrow" },
      { value: "Bartow", label: "Bartow" },
      { value: "Ben Hill", label: "Ben Hill" },
      { value: "Berrien", label: "Berrien" },
      { value: "Bibb", label: "Bibb" },
      { value: "Bleckley", label: "Bleckley" },
      { value: "Brantley", label: "Brantley" },
      { value: "Brooks", label: "Brooks" },
      { value: "Bryan", label: "Bryan" },
      { value: "Bulloch", label: "Bulloch" },
      { value: "Burke", label: "Burke" },
      { value: "Butts", label: "Butts" },
      { value: "Camden", label: "Camden" },
      { value: "Candler", label: "Candler" },
      { value: "Carroll", label: "Carroll" },
      { value: "Catoosa", label: "Catoosa" },
      { value: "Charlton", label: "Charlton" },
      { value: "Chatham", label: "Chatham" },
      { value: "Chattooga", label: "Chattooga" },
      { value: "Cherokee", label: "Cherokee" },
      { value: "Clarke", label: "Clarke" },
      { value: "Clayton", label: "Clayton" },
      { value: "Clinch", label: "Clinch" },
      { value: "Cobb", label: "Cobb" },
      { value: "Coffee", label: "Coffee" },
      { value: "Colquitt", label: "Colquitt" },
      { value: "Columbia", label: "Columbia" },
      { value: "Cook", label: "Cook" },
      { value: "Coweta", label: "Coweta" },
      { value: "Crawford", label: "Crawford" },
      { value: "Crisp", label: "Crisp" },
      { value: "Dawson", label: "Dawson" },
      { value: "Decatur", label: "Decatur" },
      { value: "DeKalb", label: "DeKalb" },
      { value: "District of Columbia", label: "District of Columbia" },
      { value: "Dodge", label: "Dodge" },
      { value: "Dooly", label: "Dooly" },
      { value: "Dougherty", label: "Dougherty" },
      { value: "Douglas", label: "Douglas" },
      { value: "Dutchess", label: "Dutchess" },
      { value: "Effingham", label: "Effingham" },
      { value: "Elbert", label: "Elbert" },
      { value: "Emanuel", label: "Emanuel" },
      { value: "Erath", label: "Erath" },
      { value: "Evans", label: "Evans" },
      { value: "Fannin", label: "Fannin" },
      { value: "Fayette", label: "Fayette" },
      { value: "Fife", label: "Fife" },
      { value: "Floyd", label: "Floyd" },
      { value: "Forsyth", label: "Forsyth" },
      { value: "Franklin", label: "Franklin" },
      { value: "Fulton", label: "Fulton" },
      { value: "Gilmer", label: "Gilmer" },
      { value: "Glascock", label: "Glascock" },
      { value: "Glynn", label: "Glynn" },
      { value: "Gordon", label: "Gordon" },
      { value: "Grady", label: "Grady" },
      { value: "Greene", label: "Greene" },
      { value: "Gwinnett", label: "Gwinnett" },
      { value: "Habersham", label: "Habersham" },
      { value: "Hall", label: "Hall" },
      { value: "Haralson", label: "Haralson" },
      { value: "Harris", label: "Harris" },
      { value: "Hart", label: "Hart" },
      { value: "Heard", label: "Heard" },
      { value: "Henry", label: "Henry" },
      { value: "Houston", label: "Houston" },
      { value: "Jackson", label: "Jackson" },
      { value: "Jasper", label: "Jasper" },
      { value: "Jeff Davis", label: "Jeff Davis" },
      { value: "Jefferson", label: "Jefferson" },
      { value: "Jones", label: "Jones" },
      { value: "Kota", label: "Kota" },
      { value: "Lamar", label: "Lamar" },
      { value: "Lanier", label: "Lanier" },
      { value: "Laurens", label: "Laurens" },
      { value: "Lee", label: "Lee" },
      { value: "Liberty", label: "Liberty" },
      { value: "Lincoln", label: "Lincoln" },
      { value: "Long", label: "Long" },
      { value: "Lowndes", label: "Lowndes" },
      { value: "Lumpkin", label: "Lumpkin" },
      { value: "Macon", label: "Macon" },
      { value: "Madison", label: "Madison" },
      { value: "Marion", label: "Marion" },
      { value: "McDuffie", label: "McDuffie" },
      { value: "McIntosh", label: "McIntosh" },
      { value: "Meriwether", label: "Meriwether" },
      { value: "Montgomery", label: "Montgomery" },
      { value: "Morgan", label: "Morgan" },
      { value: "Murray", label: "Murray" },
      { value: "Muscogee", label: "Muscogee" },
      { value: "Newton", label: "Newton" },
      { value: "Oconee", label: "Oconee" },
      { value: "Oglethorpe", label: "Oglethorpe" },
      { value: "Paulding", label: "Paulding" },
      { value: "Peach", label: "Peach" },
      { value: "Pickens", label: "Pickens" },
      { value: "Pierce", label: "Pierce" },
      { value: "Pike", label: "Pike" },
      { value: "Polk", label: "Polk" },
      { value: "Pulaski", label: "Pulaski" },
      { value: "Putnam", label: "Putnam" },
      { value: "Rabun", label: "Rabun" },
      { value: "Richmond", label: "Richmond" },
      { value: "Rockdale", label: "Rockdale" },
      { value: "San Joaquin", label: "San Joaquin" },
      { value: "Santa Cruz", label: "Santa Cruz" },
      { value: "Sarasota", label: "Sarasota" },
      { value: "Schärding", label: "Schärding" },
      { value: "Seminole", label: "Seminole" },
      { value: "Spalding", label: "Spalding" },
      { value: "Stephens", label: "Stephens" },
      { value: "Summit", label: "Summit" },
      { value: "Sumter", label: "Sumter" },
      { value: "Tattnall", label: "Tattnall" },
      { value: "Taylor", label: "Taylor" },
      { value: "Terrell", label: "Terrell" },
      { value: "Thomas", label: "Thomas" },
      { value: "Tift", label: "Tift" },
      { value: "Toombs", label: "Toombs" },
      { value: "Towns", label: "Towns" },
      { value: "Troup", label: "Troup" },
      { value: "Union", label: "Union" },
      { value: "Upson", label: "Upson" },
      { value: "Walker", label: "Walker" },
      { value: "Walton", label: "Walton" },
      { value: "Ware", label: "Ware" },
      { value: "Wayne", label: "Wayne" },
      { value: "Webster", label: "Webster" },
      { value: "Western Connecticut", label: "Western Connecticut" },
      { value: "Wheeler", label: "Wheeler" },
      { value: "White", label: "White" },
      { value: "Whitfield", label: "Whitfield" },
      { value: "Wilcox", label: "Wilcox" },
      { value: "Wilkinson", label: "Wilkinson" },
      { value: "Winnebago", label: "Winnebago" },
      { value: "Worth", label: "Worth" }
    ]
  }
];

export const generateMonthFilter = (): MapFilter[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const futureAuctions: MapFilterItem[] = [];
  const previousAuctions: MapFilterItem[] = [];
  
  const nextMonthIndex = (currentMonth + 1) % 12;
  const nextMonthNumber = nextMonthIndex + 1;
  
  futureAuctions.push({
    value: nextMonthNumber.toString(),
    label: monthNames[nextMonthIndex]!
  });
  
  for (let i = 0; i <= currentMonth; i++) {
    const monthIndex = currentMonth - i;
    const monthNumber = monthIndex + 1;
    
    previousAuctions.push({
      value: monthNumber.toString(),
      label: monthNames[monthIndex]!
    });
  }
  
  return [
    {
      title: "Future Auctions",
      items: futureAuctions
    },
    {
      title: "Previous Auctions",
      items: previousAuctions
    }
  ];
};

export const listFilter: MapFilter[] = [
  {
    title: "List",
    items: [
      {
        value: "all",
        label: "All"
      },
      {
        value: "favorites",
        label: "Favorites"
      }
    ]
  }
];
