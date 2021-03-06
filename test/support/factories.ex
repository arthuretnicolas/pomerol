defmodule Pomerol.Factories do
  use Pomerol.JsonPayloadStrategy
  # with Ecto
  use ExMachina.Ecto, repo: Pomerol.Repo

  def organization_factory do
    country = build(:country)
    country_translation = build(:country_translation, country: country)
    %Pomerol.Organization{
      name: sequence(:name, &"Organization #{&1}"),
      alias: sequence(:alias, &"Organization #{&1}"),
      country_id: country.id
    }
  end

  def organization_membership_factory do
    %Pomerol.OrganizationMembership{
      member: build(:user),
      organization: build(:organization),
      role: "owner"
    }
  end

  def organization_invite_factory do
    %Pomerol.OrganizationInvite{
      user: build(:user),
      organization: build(:organization),
      email: sequence(:email, &"email#{&1}"),
      role: "manager",
      token: Pomerol.Random.hex()
    }
  end

  def set_password(user, password) do
    hashed_password = Comeonin.Bcrypt.hashpwsalt(password)
    %{user | encrypted_password: hashed_password}
  end

  def user_factory do
    country = build(:country)
    country_translation = build(:country_translation, country: country)
    %Pomerol.User{
      first_name: sequence(:first_name, &"fn#{&1}"),
      last_name: sequence(:last_name, &"ln#{&1}"),
      email: sequence(:email, &"email-#{&1}@example.com"),
      locale: "fr",
      country_id: country.id
    }
  end

  def country_factory do
    %Pomerol.Country{
      name: sequence(:name, &"country#{&1}"),
      default_currency_code: "XXX",
      country_code: sequence(:name, &"country#{&1}"),
      default_currency_locale: "en_US",
      default_date_format: "US"
    }
  end

  def country_translation_factory do
    %Pomerol.CountryTranslation{
      country: build(:country),
      name: sequence(:name, &"country#{&1}"),
      locale: "en"
    }
  end

  def contact_person_type_factory do
    %Pomerol.Contact{
      first_name: sequence(:first_name, &"fn#{&1}"),
      last_name: sequence(:last_name, &"ln#{&1}"),
      email: sequence(:email, &"email#{&1}"),
      user: build(:user),
      organization: build(:organization),
      company: build(:contact_company),
      contact_type: "person"
    }
  end

  def contact_company_type_factory do
    %Pomerol.Contact{
      email: sequence(:email, &"email#{&1}"),
      user: build(:user),
      organization: build(:organization),
      company: build(:contact_company),
      contact_type: "company"
    }
  end

  def organization_tax_rate_factory do
    %Pomerol.OrganizationTaxRate{
      tax_rate_percent: 20,
      name: sequence(:name, &"tax_rate#{&1}"),
      organization: build(:organization),
      default: false,
      archived: false
    }
  end

  def organization_transactional_email_factory do
    %Pomerol.OrganizationTransactionalEmail{
      type: "new-quote",
      subject: "Subject",
      body: "Body",
      footer: "Footer",
      organization: build(:organization)
    }
  end

  def organization_sales_category_factory do
    %Pomerol.OrganizationSalesCategory{
      organization: build(:organization),
      organization_tax_rate: build(:organization_tax_rate),
      name: "category",
      description: "desc",
      default: false,
      archived: false
    }
  end

  def notification_email_factory do
    %Pomerol.NotificationEmail{
      organization: build(:organization),
      email: "email@email.com",
      type: "new-quote"
    }
  end

  def organization_item_factory do
    %Pomerol.OrganizationItem{
      organization: build(:organization),
      sales_category: build(:organization_sales_category),
      tax_rate: build(:organization_tax_rate),
      title: "SUPER ITEM",
      description: "SUPER DESC"
    }
  end

  def contact_company_factory do
    %Pomerol.ContactCompany{
      organization: build(:organization),
      name: "Great Corp"
    }
  end

end
