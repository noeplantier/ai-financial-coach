import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Coach() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Financial Coach. I can help you with budgeting, investing, saving strategies, debt management, and all your financial questions. How can I assist you today?',
    },
  ]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Système expert de coaching financier avec base de connaissances
  const getFinancialAdvice = (userQuery) => {
    const queryLower = userQuery.toLowerCase();

    // Base de connaissances financières structurée
    const knowledgeBase = {
      // Budgeting & Saving
      budget: {
        keywords: ['budget', 'budgeting', 'spend', 'spending', 'expense', 'money management'],
        response: `📊 **Smart Budgeting Strategy:**

**The 50/30/20 Rule:**
• 50% - Needs (rent, utilities, groceries, insurance)
• 30% - Wants (entertainment, dining out, hobbies)
• 20% - Savings & debt repayment

**Actionable Steps:**
1. Track ALL expenses for 30 days
2. Categorize into needs/wants
3. Use budgeting apps (Mint, YNAB, EveryDollar)
4. Set up automatic transfers to savings
5. Review and adjust monthly

**Pro Tips:**
• Pay yourself first (automate savings)
• Use the envelope method for variable expenses
• Build a 3-6 month emergency fund
• Cut subscriptions you don't use

Would you like specific advice on any category?`,
      },

      save: {
        keywords: ['save', 'saving', 'savings', 'emergency fund', 'rainy day'],
        response: `💰 **Ultimate Saving Strategy:**

**Emergency Fund Priority:**
1. Start with $1,000 minimum
2. Build to 3-6 months of expenses
3. Keep in high-yield savings account (4-5% APY)

**Savings Hierarchy:**
1. Emergency fund (3-6 months)
2. Employer 401(k) match (free money!)
3. Pay off high-interest debt (>7%)
4. Max out Roth IRA ($7,000/year)
5. Additional retirement savings
6. Save for specific goals

**Automation Hacks:**
• Set up direct deposit split
• Round-up apps (Acorns, Qapital)
• Auto-transfer on payday
• Use savings challenges (52-week challenge)

**High-Yield Savings Accounts:**
Marcus, Ally Bank, American Express (4-5% APY currently)

How much are you looking to save monthly?`,
      },

      invest: {
        keywords: ['invest', 'investment', 'stock', 'portfolio', 'retirement', '401k', 'roth', 'ira'],
        response: `📈 **Investment Mastery Guide:**

**For Beginners:**
1. **Index Funds** (lowest risk for long-term)
   • S&P 500 (VOO, SPY)
   • Total Market (VTI)
   • International (VXUS)

2. **Asset Allocation by Age:**
   • 20s-30s: 90% stocks, 10% bonds
   • 40s: 80% stocks, 20% bonds
   • 50s: 70% stocks, 30% bonds
   • 60s+: 60% stocks, 40% bonds

**Investment Accounts Priority:**
1. 401(k) up to employer match
2. Roth IRA (tax-free growth!)
3. Max 401(k) ($23,000/year limit)
4. Taxable brokerage account

**Best Platforms:**
• Vanguard (low fees)
• Fidelity (great research)
• Charles Schwab (excellent support)
• Robinhood (beginners, no fees)

**Golden Rules:**
• Start early (compound interest!)
• Dollar-cost averaging (invest regularly)
• Diversify (don't put all eggs in one basket)
• Think long-term (10+ years)
• Never invest money you need soon

**Robo-Advisors** (hands-off approach):
Betterment, Wealthfront (0.25% fee, auto-rebalancing)

What's your investment timeline?`,
      },

      debt: {
        keywords: ['debt', 'credit card', 'loan', 'pay off', 'payoff', 'owe', 'owing'],
        response: `💳 **Debt Elimination Strategy:**

**Two Proven Methods:**

**1. Debt Avalanche (Saves Most Money):**
• Pay minimums on all debts
• Attack highest interest rate first
• Roll payments into next debt

**2. Debt Snowball (Psychological Wins):**
• Pay minimums on all debts
• Attack smallest balance first
• Quick wins build momentum

**Priority Order:**
1. Payday loans (400%+ APR) - URGENT
2. Credit cards (15-25% APR)
3. Personal loans (8-15% APR)
4. Student loans (4-7% APR)
5. Mortgage (3-5% APR)

**Action Plan:**
• Stop using credit cards temporarily
• Negotiate lower interest rates (call creditors!)
• Consider balance transfer (0% APR 12-18 months)
• Side hustle to accelerate payments
• Debt consolidation loan if needed

**Credit Card Hacks:**
• Pay more than minimum (saves thousands)
• Pay bi-weekly instead of monthly
• Use windfalls (bonus, tax refund) for debt

**Never Do:**
❌ Only pay minimums
❌ Take on new debt
❌ Ignore collections

How much total debt do you have?`,
      },

      credit: {
        keywords: ['credit score', 'credit', 'fico', 'credit report', 'improve credit'],
        response: `⭐ **Credit Score Optimization:**

**What Affects Your Score:**
• Payment history (35%) - Most important!
• Credit utilization (30%) - Keep under 30%
• Credit age (15%) - Don't close old cards
• Credit mix (10%) - Different types help
• New credit (10%) - Limit hard inquiries

**Quick Wins to Boost Score:**
1. Pay bills on time (set autopay!)
2. Keep utilization under 30% (under 10% is ideal)
3. Pay down balances before statement date
4. Become authorized user on old account
5. Dispute errors on credit report
6. Don't close old credit cards

**Score Ranges:**
• 800+ Exceptional
• 740-799 Very Good
• 670-739 Good
• 580-669 Fair
• <580 Poor

**Free Credit Monitoring:**
• Credit Karma (free score updates)
• AnnualCreditReport.com (official reports)
• Experian (free monitoring)

**Fast Track (60-90 days):**
• Pay down cards to <10% utilization
• Dispute any errors
• Ask for credit limit increases
• Add utility bills to credit (Experian Boost)

Current credit score goal?`,
      },

      income: {
        keywords: ['income', 'earn', 'salary', 'make money', 'side hustle', 'passive income'],
        response: `💵 **Income Maximization Strategy:**

**Increase Active Income:**
1. **Career Growth:**
   • Ask for raise (research market rates)
   • Job hop every 2-3 years (10-20% raises)
   • Upskill (certifications, courses)
   • Network relentlessly

2. **Side Hustles (Easy Start):**
   • Freelancing (Upwork, Fiverr)
   • Tutoring (Wyzant, Chegg)
   • Delivery (DoorDash, Uber)
   • Dog walking (Rover)
   • Virtual assistant

3. **High-Paying Side Hustles:**
   • Web development ($50-150/hr)
   • Graphic design ($30-100/hr)
   • Writing/Copywriting ($50-200/hr)
   • Consulting in your field
   • Online courses

**Build Passive Income:**
1. **Dividend Stocks** (3-5% annual yield)
2. **Real Estate** (rental properties)
3. **REITs** (real estate without owning)
4. **High-yield savings** (4-5% APY)
5. **Digital products** (courses, ebooks)
6. **Affiliate marketing**
7. **YouTube/Blog** (ad revenue)

**Quick Money Hacks:**
• Sell unused items (eBay, Facebook)
• Cash back apps (Rakuten, Ibotta)
• Bank bonuses ($200-500)
• Referral programs

What skills do you have to monetize?`,
      },

      retire: {
        keywords: ['retire', 'retirement', 'pension', 'fire', 'early retirement'],
        response: `🏖️ **Retirement Planning Mastery:**

**Retirement Accounts:**
1. **401(k)** - Employer plan
   • Contribute enough for full match
   • Limit: $23,000/year ($30,500 if 50+)
   • Tax-deferred growth

2. **Roth IRA** - Tax-free retirement
   • Contribute $7,000/year ($8,000 if 50+)
   • Withdraw tax-free in retirement
   • Income limits apply

3. **Traditional IRA** - Tax deduction now
   • Same limits as Roth
   • Taxed on withdrawal

**How Much You Need:**
• **Rule of 25:** Annual expenses × 25
• Example: $40k/year needed = $1M saved
• **4% Rule:** Withdraw 4% annually

**FIRE Movement** (Financial Independence, Retire Early):
• Save 50-70% of income
• Lean FIRE: $25-40k/year
• Fat FIRE: $100k+/year
• Coast FIRE: Savings grow, work optional

**Age-Based Goals:**
• Age 30: 1× salary saved
• Age 40: 3× salary saved
• Age 50: 6× salary saved
• Age 60: 8× salary saved
• Age 67: 10× salary saved

**Catch-Up Strategy:**
• Max all retirement accounts
• Reduce expenses dramatically
• Increase income aggressively
• Invest windfalls
• Consider rental properties

When do you want to retire?`,
      },

      tax: {
        keywords: ['tax', 'taxes', 'deduction', 'irs', 'refund', 'write off'],
        response: `🧾 **Tax Optimization Strategy:**

**Legal Tax Reductions:**

**1. Max Retirement Contributions:**
• 401(k): Reduces taxable income
• HSA: Triple tax advantage!
• Traditional IRA: Tax deduction

**2. Tax Deductions:**
• Mortgage interest
• Property taxes (up to $10k)
• Charitable donations
• Student loan interest
• Medical expenses (>7.5% income)
• State/local taxes
• Home office (self-employed)

**3. Tax Credits (Better than Deductions):**
• Child Tax Credit ($2,000/child)
• Earned Income Credit
• Saver's Credit (retirement)
• Education credits
• Energy-efficient home improvements

**4. Self-Employed Benefits:**
• Deduct business expenses
• Home office deduction
• Vehicle expenses
• Health insurance premiums
• SEP IRA (save up to $66,000)

**5. Investment Tax Strategies:**
• Hold investments 1+ year (lower rate)
• Tax-loss harvesting
• Roth conversions in low-income years
• Qualified dividends (lower tax)

**Free Filing:**
• IRS Free File (income <$79k)
• FreeTaxUSA
• Cash App Taxes

**When to Hire CPA:**
• Self-employed
• Complex investments
• Multiple income sources
• Major life changes

Need specific tax advice for your situation?`,
      },

      house: {
        keywords: ['house', 'home', 'mortgage', 'buy house', 'rent', 'real estate'],
        response: `🏠 **Home Buying Strategy:**

**Can You Afford It?**
• **28/36 Rule:**
  - Housing costs ≤ 28% gross income
  - Total debt ≤ 36% gross income

**Rent vs Buy Calculator:**
• Buy if staying 5+ years
• Rent if flexibility needed
• Consider all costs (maintenance, insurance, taxes)

**Saving for Down Payment:**
• **20% down** - No PMI, best rates
• **10-15%** - Still good, small PMI
• **3.5%** - FHA loan (first-time buyers)
• **0%** - VA loan (veterans)

**Home Buying Steps:**
1. Check credit score (720+ for best rates)
2. Save 20% down + 2-5% closing costs
3. Get pre-approved for mortgage
4. Find agent (buyer agent is free!)
5. Make offer with contingencies
6. Home inspection (always!)
7. Close and celebrate!

**Mortgage Types:**
• **15-year fixed** - Higher payment, less interest
• **30-year fixed** - Lower payment, more interest
• **ARM** - Risky, avoid unless expert

**First-Time Buyer Programs:**
• FHA loans (3.5% down)
• State/local grants
• Down payment assistance
• Tax credits

**Extra Payment Strategy:**
• One extra payment/year = 7 years off 30-year
• Bi-weekly payments = save $100k+ interest

Ready to crunch the numbers?`,
      },

      emergency: {
        keywords: ['emergency', 'unexpected', 'crisis', 'broke', 'no money', 'help'],
        response: `🆘 **Emergency Financial Survival:**

**Immediate Actions (24-48 hours):**
1. **Stop all non-essential spending** NOW
2. **List all income sources**
3. **List all debts** (prioritize by importance)
4. **Call creditors** - Explain situation, ask for hardship program
5. **Apply for assistance**

**Pay These FIRST:**
1. Shelter (rent/mortgage)
2. Utilities (heat, water, electric)
3. Food
4. Transportation (to work)
5. Insurance (health, car if needed for work)

**Pay These LAST:**
• Credit cards
• Personal loans
• Collections

**Quick Cash Sources:**
1. Sell items immediately (Facebook, Craigslist)
2. Pawn items (get back later)
3. Side gigs (TaskRabbit, Rover, delivery)
4. Ask for advance at work
5. Family/friends (have repayment plan)

**Government Assistance:**
• SNAP (food stamps)
• WIC (women/children nutrition)
• LIHEAP (utility assistance)
• Section 8 (housing)
• Medicaid (healthcare)
• 211.org (local resources)

**Nonprofit Help:**
• Food banks
• Salvation Army
• United Way
• Catholic Charities
• Local community centers

**Avoid:**
❌ Payday loans (400% APR!)
❌ Title loans
❌ Cash advances
❌ Pawn loans (unless temporary)

**Rebuild Plan:**
• Emergency fund to $1,000 ASAP
• Then to 3-6 months expenses
• Increase income (side hustle)
• Budget strictly

You'll get through this. What's the most urgent need?`,
      },

      insurance: {
        keywords: ['insurance', 'life insurance', 'health insurance', 'protect'],
        response: `🛡️ **Insurance Protection Strategy:**

**Essential Coverage:**

**1. Health Insurance** (CRITICAL)
• Get through employer if possible
• Healthcare.gov for individual
• Consider high-deductible + HSA
• Never go uninsured

**2. Life Insurance** (If dependents)
• **Term life** - Cheap, pure protection
  - 10-20× annual income coverage
  - $500k for 20 years = $30-50/month
• **Avoid whole life** - Expensive, poor investment

**3. Disability Insurance**
• Protects income if can't work
• Get through employer first
• Individual policy if high earner
• 60-70% income replacement

**4. Auto Insurance** (If you drive)
• Liability: State minimums
• Better: 100/300/100 coverage
• Add umbrella policy if assets >100k

**5. Homeowners/Renters**
• **Renters**: Covers belongings ($15-30/month)
• **Homeowners**: Replacement cost coverage
• Document everything with photos

**6. Umbrella Policy** (If assets >$100k)
• $1M coverage = $200-400/year
• Protects against major lawsuits

**Skip These:**
❌ Extended warranties
❌ Cancer insurance (covered by health)
❌ Credit card insurance
❌ Flight insurance
❌ Whole life insurance (for most people)

**Money-Saving Tips:**
• Bundle policies (10-25% discount)
• Increase deductibles
• Ask about discounts
• Shop around annually
• Good credit = lower rates

What coverage do you need?`,
      },
    };

    // Analyse de sentiment et classification
    let bestMatch = null;
    let highestScore = 0;

    Object.keys(knowledgeBase).forEach((category) => {
      const keywords = knowledgeBase[category].keywords;
      let score = 0;

      keywords.forEach((keyword) => {
        if (queryLower.includes(keyword)) {
          score += keyword.length; // Plus le mot-clé est long, plus il est spécifique
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = category;
      }
    });

    // Si correspondance trouvée
    if (bestMatch && highestScore > 0) {
      return knowledgeBase[bestMatch].response;
    }

    // Réponses pour questions générales
    if (
      queryLower.includes('help') ||
      queryLower.includes('start') ||
      queryLower.includes('begin')
    ) {
      return `👋 **Great to meet you!** 

I'm your AI Financial Coach specializing in:

💰 **Budgeting & Saving**
📈 **Investing & Retirement**
💳 **Debt Management**
⭐ **Credit Score Improvement**
💵 **Income Growth**
🏠 **Home Buying**
🛡️ **Insurance & Protection**
🧾 **Tax Optimization**

**Popular questions:**
• "How should I budget my income?"
• "How do I start investing?"
• "What's the best way to pay off debt?"
• "How can I save for retirement?"
• "Should I rent or buy a house?"

What would you like to know?`;
    }

    if (queryLower.includes('thank')) {
      return `You're very welcome! 😊 

Remember:
✓ Start small, stay consistent
✓ Automate everything you can
✓ Invest in yourself first
✓ Think long-term

Feel free to ask me anything else about your finances. I'm here to help you build wealth and financial freedom!

Good luck on your financial journey! 💪`;
    }

    // Réponse par défaut avec suggestions
    return `I can help you with that! To give you the best advice, could you be more specific about:

💰 **Budgeting & Saving** - Want to manage money better?
📈 **Investing** - Ready to grow your wealth?
💳 **Debt** - Need to pay off credit cards or loans?
⭐ **Credit Score** - Want to improve your score?
💵 **Income** - Looking to earn more money?
🏠 **Home Buying** - Thinking about purchasing a house?
🛡️ **Insurance** - Need protection advice?
🧾 **Taxes** - Want to reduce your tax bill?
🆘 **Emergency** - Facing a financial crisis?

Try asking: "How should I budget my income?" or "What's the best way to invest $1000?"`;
  };

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMessage = query.trim();
    setQuery('');
    setLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    // Simulate thinking delay for better UX
    setTimeout(() => {
      const advice = getFinancialAdvice(userMessage);

      // Add AI response
      setMessages((prev) => [...prev, { role: 'assistant', content: advice }]);
      setLoading(false);
    }, 800);
  };

  const handleSuggestionPress = (suggestion) => {
    setQuery(suggestion);
  };

  const suggestions = [
    'How should I budget my income?',
    'Best way to start investing?',
    'How to pay off credit card debt?',
    'Should I rent or buy a house?',
    'How to save for retirement?',
    'Ways to increase my income?',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Background avec particules */}
      <View style={styles.backgroundContainer}>
        <View style={styles.gradientBackground}>
          {[...Array(15)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.particle,
                {
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>✨</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>AI Financial Coach</Text>
        </View>
        <Text style={styles.subtitle}>
          Expert advice on budgeting, investing, saving & more
        </Text>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.role === 'user' ? styles.userMessage : styles.assistantMessage,
            ]}
          >
            {message.role === 'assistant' && (
              <View style={styles.assistantIcon}>
                <Text style={styles.assistantIconText}>🤖</Text>
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                message.role === 'user'
                  ? styles.userBubble
                  : styles.assistantBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.role === 'user' && styles.userMessageText,
                ]}
              >
                {message.content}
              </Text>
            </View>
          </View>
        ))}

        {loading && (
          <View style={[styles.messageContainer, styles.assistantMessage]}>
            <View style={styles.assistantIcon}>
              <Text style={styles.assistantIconText}>🤖</Text>
            </View>
            <View style={[styles.messageBubble, styles.assistantBubble]}>
              <View style={styles.loadingContainer}>
                <View style={styles.loadingDot} />
                <View style={[styles.loadingDot, styles.loadingDot2]} />
                <View style={[styles.loadingDot, styles.loadingDot3]} />
              </View>
            </View>
          </View>
        )}

        {/* Suggestions */}
        {messages.length === 1 && !loading && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>💡 Try asking:</Text>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything about finance..."
            placeholderTextColor="#666"
            multiline
            maxLength={500}
            value={query}
            onChangeText={setQuery}
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!query.trim() || loading) && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!query.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator color="#1A1A1A" size="small" />
            ) : (
              <Text style={styles.sendIcon}>➤</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientBackground: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  particle: {
    position: 'absolute',
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#FFD700',
    opacity: 0.5,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.2)',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  iconText: {
    fontSize: 32,
  },
  titleContainer: {
    backgroundColor: '#FFD700',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: '#A0A0A0',
    textAlign: 'center',
    fontSize: 13,
    paddingHorizontal: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  assistantMessage: {
    justifyContent: 'flex-start',
  },
  assistantIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  assistantIconText: {
    fontSize: 18,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 14,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#FFD700',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    opacity: 0.4,
  },
  loadingDot2: {
    opacity: 0.7,
  },
  loadingDot3: {
    opacity: 1,
  },
  suggestionsContainer: {
    marginTop: 20,
  },
  suggestionsTitle: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestionChip: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  suggestionText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 215, 0, 0.2)',
    backgroundColor: '#1A1A1A',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 16,
    color: '#E0E0E0',
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendIcon: {
    fontSize: 20,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
});