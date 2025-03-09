extern crate chrono;


use chrono::Datelike;

fn main() {
    println!("Hello ASL!");
    let current_date = chrono::Utc::now();
    let year = current_date.year();
    let month = current_date.month();
    let day = current_date.day();
    println!("{}-{}-{}", year, month, day);
}
